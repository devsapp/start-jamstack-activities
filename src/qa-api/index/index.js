const { dk, tablestoreInitialzerPlugin } = require('@serverless-devs/dk');



const handler = dk(async (ctx) => {
    const { tableClient, TableStore } = ctx.internal;
    const { name, desc, addr, phone } = ctx.req.body;
    const getRange = async function (params) {
        const data = await tableClient.getRange(params);
        return data.rows;
    };

    const tableName = 'user';

    const condition = new TableStore.SingleColumnCondition('phone', phone, TableStore.ComparatorType.EQUAL, true);
    const userData = await getRange({
        tableName,
        maxVersions: 10,
        inclusiveStartPrimaryKey: [{ phone: TableStore.INF_MIN }],
        exclusiveEndPrimaryKey: [{ phone: TableStore.INF_MAX }],
        primaryKey: [{ phone }],
        limit: 1,
        columnFilter: condition
    })

    if (userData && userData[0] && userData[0].primaryKey) {
        return { json: { code: 400, message: '用户已经存在' } };
    }
    const currentTimeStamp = Date.now();
    const params = {
        tableName: tableName,
        primaryKey: [{ 'phone': phone }],
        condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
        attributeColumns: [
            { 'name': name, 'timestamp': currentTimeStamp },
            { 'addr': addr },
            { 'desc': desc }
        ],
        returnContent: { returnType: TableStore.ReturnType.Primarykey }
    };
    const data = await tableClient.putRow(params);
    return { json: { code: 200, data, message: '用户录入成功' } };
})


handler.use(tablestoreInitialzerPlugin());

exports.initializer = handler.initializerHandler;

exports.handler = handler;

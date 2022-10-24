exports.handler = async (event) => {
    console.log(event)
    const voteId = event.pathParameters.voteId;
    const vote = {'vote': voteId, 'voteName': voteId };
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(vote),
    };
    return response;
};
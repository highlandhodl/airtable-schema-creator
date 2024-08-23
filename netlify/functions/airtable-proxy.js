const axios = require('axios');

exports.handler = async function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  console.log('Airtable URL:', url);

  try {
    const { fields } = JSON.parse(event.body);
    console.log('Parsed fields:', fields);
    
    const airtableData = {
      records: [
        {
          fields: {
            "Persona Name": fields.personaName,
            "Job Role": fields.jobRole
          }
        }
      ]
    };

    console.log('Airtable data:', JSON.stringify(airtableData, null, 2));

    const response = await axios.post(url, airtableData, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Airtable response:', JSON.stringify(response.data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return {
      statusCode: 422,
      body: JSON.stringify({ 
        error: 'Unable to process request', 
        details: error.response ? error.response.data : error.message 
      })
    };
  }
};
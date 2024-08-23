const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  try {
    const { fields } = JSON.parse(event.body);
    
    // Convert the companyProfiles string to an array if it's not already
    if (typeof fields.companyProfiles === 'string') {
      fields.companyProfiles = fields.companyProfiles.split(',').map(item => item.trim());
    }

    const airtableData = {
      records: [
        {
          fields: fields
        }
      ]
    };

    const response = await axios.post(url, airtableData, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 422,
      body: JSON.stringify({ error: 'Unable to process request', details: error.message })
    };
  }
};
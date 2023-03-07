import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.discogs.com'
})

const consumer_key = 'nidCIjZGeKILBIkVrnkP'
const consumer_secret = 'IkFrxnmDwjoXBshzklGSdOFVhUDOWUAW'
const timestamp = new Date.now()

export async function requestToken() {
  const { oauth_token, oauth_token_secret } = await api.get('/oauth/request_token', {
    headers: {
      Authorization: `OAuth oauth_consumer_key="${consumer_key}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${timestamp}",oauth_nonce="31f1c3e2-acfe-4f62-b4eb-70d4b62e4c15",oauth_version="1.0",oauth_signature="${consumer_secret}&", oauth_callback="your_callback"`
    }
  })
  return oauth_token, oauth_token_secret
}

export async function getReleases() {
  const { pagination, releases } = await api.get('/artists/21262/releases')
  return pagination, releases
}

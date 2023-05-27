// TODO: Never use Full API token in the browser, only use it on the server
// TODO: Use READONLY API token in the browser
export const TOKEN = process.env['NX_API_TOKEN']
export const COMMENT_TOKEN = process.env['NX_COMMENT_TOKEN']

export const NX_RECAPTCHA_SITE_KEY = process.env['NX_RECAPTCHA_SITE_KEY']

export const NX_RECAPTCHA_SECRET_KEY = process.env['NX_RECAPTCHA_SECRET_KEY']

const secrets = {
  COOKIE_PASSWORD: process.env['NX_SECRET_COOKIE_PASSWORD'],
  DEEPL_API_KEY: process.env['NX_DEEPL_API_KEY'],
  MOLLIE_KEY: process.env['NX_MOLLIE_KEY'],
}

type Secrets = keyof typeof secrets

export const getSecret = (key: Secrets) => {
  if (typeof window !== 'undefined') {
    // console.error(key + ' secret should only be used on the server')

    return
  }

  return secrets[key]
}

export const sessionOptions = {
  password: getSecret('COOKIE_PASSWORD') || '12345678901234567890123456789012',
  cookieName: 'iron-session',
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
  },
}

const atlasCreds = {
    user: process.env.ATLAS_USER,
    password: process.env.ATLAS_PASSWORD
}
if (!atlasCreds.user || !atlasCreds.password) {
    throw new Error('config: missing user or password for atlas connection string')
}

const config = {
    'filesystem': {
        path: './DB'
    },
    'mongodb': {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    'atlas': {
        cnxStr: `mongodb+srv://${atlasCreds.user}:${atlasCreds.password}@cluster0.mev0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    'firebase': {
        "type": "service_account",
        "project_id": "cursobech",
        "private_key_id": "496f0d43af45a9b5a7f01df6b4fd922b70850c1c",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdTp/LVDS+8HNT\nJxByd90R1QrfVg7p2e+bHs9efbr2z5VuZOvWPg1r6BabWTdjldZStdoxDnjWiD9d\nBzSSPWgOoyQmRXSuvZoUGSAljRqDCXl4q4s1Pf/A18KCZO5k0On30YKoTCvTtC0u\nqkg5dh6lzJTs5AJGWPSiuLonEZrQV3OKO5t9caxtHFJMSq0GtfGHcGrYdlaOsGWv\n587vT05k8+xzz9B2Aj8m9m7OU08IwTshQOCsjahgdfwbK4IMZ5mEGHx/IlS+U0eL\nsDuEMjXQ7dKkMxQ9YON8N055CgzPE5LRmqwYtFjBa4z167AojHtOGVGwFsb2Kf+Y\n5VG8Ln+5AgMBAAECggEAEhsc3tsiGBEWgQ1nwfkkZ5tJHVQrMsTsJINbFHHtzV8u\nwK5ai8YIJvGnenl+G9cA/HOkec2D4JN9kZBU/3kUa0zhSgtoBv3ZSHNs5Q2U7dyv\nD9HU28u3ToO3BmmmG9IFAApsGsFrsPoV0j90wTJkjCpcQNjsnxq5i6ot+PW4hz6/\nOpAMo5WdDaRxsd9Kge+/7CcpH2T7qoZOP42i6UdzllLlV2OdnsmWfacQjDKzYsi5\nfAjd51aC+fLOUFTVz8IHxr8OcgX2LAMX7o02ah1AAZLGeyIaPZuEqXGOu+XN61Hr\nGo6U6NUXdTB74YH71Nmw7+BAKCydOU7Ct7fb4ZwjxQKBgQDZ02rYQVi9oVjXW9Yk\nnDqUXIjk8PBOHAb6ASHFvgmZDFXo9Cbf8vyCsNwqHiztYLvv8IfY4KVt3FHBIl0R\nrrU0MQdpuiYlOMboOGgHXg1Sb/qLiqff3CthflSKew8oDtrHerFPjYxPwaIzQLp2\n7Na8LCCug6dMYD42BNqUZJ007QKBgQC44BUqYjWSTHsJk62/T5Gw8ihpMyQ5AytO\nwXOgyUZs9NMAbRbJa0AiJbPWd3uNt2QDU7wHDSng9MVbeJOWE3ayxxi8mWDfN7ho\niNJ+AM6fhsOk+W+ZwuGWfcoNj9nlOvIhWMWXphx+uCETqSp+Dk8iis6C3hTNDFjP\nqY5Jdo1IfQKBgBUqVddtghHq+5bxdX1ZMNf5pdOZFcCBOKxSL9XnAUe9yxs3ng9k\nrOSGCt6M0BDAtYI6/Pg1290w60C49hIhx7mqie3cCJjVS36E/Ja6rNC10MJ+VpGJ\n8y0l+VD7ZB2gU+HOKixwtJGLXxdb0sJ7gOIH56UNZdQmBeV500NYA26BAoGANaA6\nQ3sNUwyAO/zsTywDdLIpaqp8/VSgAU43/hGkLgKuGdeK3o4PolgRXEp4OllR1204\ng0scNLaLcMb++G9Y5O6/jCVpZhZBlYDqncYaKUfsBDSeXJmc2gxOybRKXiXFCks3\ntY9ngJJkddGCE+KOrdRZprhIjFnigQoLzd9nh/kCgYA4qlZlX/yfVOrpXkBYmawe\nKT4juUkpU5KegObb7QBHZTU2+Hbn4WB9vqr0+2nxzyyidyiwYlVXDm3rNAWWL85+\nhB+DgoBQX9H13OSRKOXdVjFx9kn8yEPVcGDrlLYkM6TUq4Lm9PtBYbQjJAHzvhR8\ndXit47q04xU6Rmzyu3+T2Q==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-jd8u5@cursobech.iam.gserviceaccount.com",
        "client_id": "101545404680349960131",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jd8u5%40cursobech.iam.gserviceaccount.com"
    }
}

export default config
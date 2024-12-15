import { AppConfig } from 'config/default'
import config from 'config'

export const appConfig: AppConfig = {
    serverPort: config.get<number>('serverPort'),
    dbUrl: config.get<string>('dbUrl'),
    secretKey: config.get<string>('secretKey'),
    filePath: config.get<string>('filePath'),
    staticPath: config.get<string>('staticPath'),
}

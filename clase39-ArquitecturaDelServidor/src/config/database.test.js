import { fn } from '../../config/database'

test('test config value', () => {
    const config = {
        DB_PORT: 5000
    }

    const database = fn(config)
        
    expect(database.port).toBe(5000)
})

test('test default value', () => {
    const config = {}

    const database = fn(config)
        
    expect(database.port).toBe('localhost')
})
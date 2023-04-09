const { Telegraf, session, Scenes: { Stage } } = require('telegraf')
const Menu = require('./menu')

const config = require('./config.json')
const bot = new Telegraf(config.token)


// bot.use(session())

bot.start(ctx => {
  return Menu.get(ctx, 'category')
})

bot.action('category', ctx => {
  return Menu.get(ctx, 'category')
})

bot.action(/products_(.+)_(.+)/, async ctx => {
  return Menu.get(ctx, 'products')
})

bot.action(/products_(.+)/, async ctx => {
  return Menu.get(ctx, 'products')
})

bot.action(/product_(.+)_(.+)/, async ctx => {
  return Menu.get(ctx, 'product')
})

bot.action(/help_(.+)/, async ctx => {
  return Menu.get(ctx, 'help')
})

bot.action(/money_(.+)/, async ctx => {
  return Menu.get(ctx, 'money')
})

module.exports = bot
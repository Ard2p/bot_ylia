const { Markup } = require('telegraf')

class Menu {
    constructor() {
        this.products = require('./products.json')
    }

    get(ctx, slug, options = {}, del = true) {
        if (del) ctx.deleteMessage().catch(e => { })

        let keyboard, keyboard_items, text, cat_id, product_id, product, money
        switch (slug) {
            case 'category':
                keyboard_items = []
                this.products.categories.forEach((value, key) => {
                    keyboard_items.push([Markup.button.callback(value.name, 'help_' + key)])
                })

                text = 'Категории товаров'
                keyboard = Markup.inlineKeyboard(keyboard_items)
                break

            case 'help':
                cat_id = parseInt(ctx.match[1])

                text = 'Нужна ли вам помощь в подборке по цене?'
                keyboard = Markup.inlineKeyboard([
                    Markup.button.callback('Не подбирать', 'products_' + cat_id),
                    Markup.button.callback('Подобрать', 'money_' + cat_id)
                ])
                break

            case 'money':
                cat_id = parseInt(ctx.match[1])

                text = 'Выберите диапозон бюджета'
                keyboard = Markup.inlineKeyboard([
                    Markup.button.callback('до 1000', 'products_' + cat_id + '_1000'),
                    Markup.button.callback('до 2500', 'products_' + cat_id + '_2500'),
                    Markup.button.callback('до 5000', 'products_' + cat_id + '_5000'),
                    Markup.button.callback('до 10000', 'products_' + cat_id + '_10000')
                ])
                break

            case 'products':
                cat_id = parseInt(ctx.match[1])
                money = parseInt(ctx.match[2]) || null

                keyboard_items = [
                    [Markup.button.callback('Назад', 'category')]
                ]         
                
                this.products.categories[cat_id].products.forEach((value, key) => {
                    if(!money || money && value.price <= money)
                        keyboard_items.push([Markup.button.callback(value.name, 'product_' + cat_id + '_' + key)])
                })

                text =  this.products.categories[cat_id].name
                keyboard = Markup.inlineKeyboard(keyboard_items)
                break

            case 'product':
                cat_id = parseInt(ctx.match[1])
                product_id = parseInt(ctx.match[2])

                keyboard_items = [
                    [Markup.button.callback('Назад', 'products_' + cat_id)]
                ]           

                product = this.products.categories[cat_id].products[product_id]

                text = product.desc
                keyboard = Markup.inlineKeyboard(keyboard_items)
                break
        }

        return ctx.reply(text, {
            parse_mode: 'HTML',
            ...keyboard
        })
    }
}

module.exports = new Menu()
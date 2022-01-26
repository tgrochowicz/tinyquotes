const { TinybotPlugin } = require('tinybot')

class Tinyquotes extends TinybotPlugin {
    name = 'Tinyquotes';

    static Decorators = {
        Code: ((msg) => (`\`${msg}\``)),
        Quotes: ((msg) => (`"${msg}"`))
    }

    constructor(options = {}) {
        super(options);
        
        this.probability = options.probability || 0.005;
        this.quotes = options.quotes || [];
        this.random = options.random || false;
        this.triggerOnMentions = options.triggerOnMentions || false;
        this.decorator = options.decorator || ((msg) => (msg));
        if (!this.quotes.length) {
            this.error("No quotes provided to Tinyquotes");
        }
    }

    getRandomQuote() {
        var allQuotes = this.quotes;
        if (!this.quotes.length) return undefined;
        return allQuotes[Math.floor(Math.random() * Math.floor(allQuotes.length))];
    }

    get captures() {
        return /.*/;
    }

    async handler({event, say}) {
        console.log(event);
        if (!event || !event.type || !['message', 'app_mention'].includes(event.type)) return;
        if((this.random && Math.random() < this.probability) || (this.triggerOnMentions && this.botIDInMessage(event.text))) {
            // send message back
            const quote = this.getRandomQuote();
            say(this.decorator(quote));
        }
    }
}

module.exports = Tinyquotes;
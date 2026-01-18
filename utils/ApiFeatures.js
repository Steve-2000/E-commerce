class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword
            ? {
                name: {
                    $regex: this.queryString.keyword,
                    $options: 'i'
                }
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        let filterquery = { ...this.queryString };

        // Convert bracket notation like price[gt]=1 => { price: { gt: '1' } }
        Object.keys(filterquery).forEach((key) => {
            const match = key.match(/^([^\[]+)\[([^\]]+)\]$/);
            if (match) {
                const field = match[1]; 
                const op = match[2];
                filterquery[field] = filterquery[field] || {};
                filterquery[field][op] = filterquery[key];
                delete filterquery[key];
            }
        });

        const removefield = ['keyword', 'page', 'limit'];
        removefield.forEach((field) => delete filterquery[field]);

        // stringify and prefix operators with $ (gt/gte/lt/lte)
        let querystr = JSON.stringify(filterquery);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        const parsed = JSON.parse(querystr);

        // Convert numeric strings to numbers recursively
        const convertNumericStrings = (obj) => {
            if (!obj || typeof obj !== 'object') return;
            Object.keys(obj).forEach((k) => {
                const v = obj[k];
                if (v && typeof v === 'object') {
                    convertNumericStrings(v);
                } else if (typeof v === 'string' && v.trim() !== '' && !isNaN(v)) {
                    obj[k] = Number(v);
                }
            });
        };
        convertNumericStrings(parsed);

        // debug: console.log('ApiFeatures filter parsed:', JSON.stringify(parsed));
        this.query = this.query.find(parsed);
        return this;
    }

    pagination(dperpage) {
        const currentpage = Number(this.queryString.page) || 1;
        const skip = (currentpage-1)*dperpage
        this.query = this.query.limit(dperpage).skip(skip);
        return this;

    }
}

module.exports = ApiFeatures;
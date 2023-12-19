module.exports = class APIFactory {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryObject = { ...this.queryString };

    const fieldsToExclude = ["keyword"];
    fieldsToExclude.forEach((field) => delete queryObject[field]);

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
};

class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {

    const location = this.queryStr.location ? {

        address: {

        $regex: this.queryStr.location,
        $options: 'i'
        }
    } : {};

    this.query = this.query.find({...location});
    return this
  }
  filter()  {

    const queryCopy = {...this.queryStr};

    const excludedFields = ['page', 'resPerPage' , 'sort', 'limit', 'location', 'fields'];

    excludedFields.forEach(el => delete queryCopy[el]);

    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;

  }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    pagination() {
        const page = Number(this.queryStr.page) || 1;
        const resPerPage = this.queryStr.resPerPage || 4;
        const skip = resPerPage * (page - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }   


}
export default APIFeatures;
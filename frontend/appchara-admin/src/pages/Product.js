
const Product = () => {
    return ( 
        <div className="product">
            <div className="px-5 py-2">
                <h1 className="mb-4">Products</h1>
                <div className="row">
                    <div className="col col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="card-title">Ampalaya</h5>
                                        <h6 className="card-subtitle text-secondary">Stock: 100</h6>
                                    </div>
                                    <i className="bi bi-three-dots-vertical fs-5"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Product;
const AddProduct = () => {
    return ( 
        <div className="add-product">
            <button className="btn btn-outline-success mb-2 mt-4"
                data-bs-toggle="modal" 
                data-bs-target="#productform">
                Add Product
            </button>
            <div className="modal fade" id="productform" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <form>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add New Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label for="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name"/>
                            </div>
                            <div className="mb-3">
                                <label for="price" className="form-label">Price</label>
                                <input type="text" className="form-control" id="price"/>
                            </div>
                            <div className="mb-3">
                                <label for="stock" className="form-label">Initial Stock</label>
                                <input type="text" className="form-control" id="stock"/>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" value={"submit"} className="btn btn-success">Confirm</button>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default AddProduct;
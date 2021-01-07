

import React from 'react';

const ProductList = ({productList=[]}) => {

    return (

        <div id="productList">
            {productList.map((data,index)=>{
                if (data) {
                    return (
                        <div id="product">
                            <h1>{data.Name}</h1>
                            <h2>{data.Brand}</h2>
                        </div>
                    )
                }

                return null
            })}
        </div>
    )
}

export default ProductList;


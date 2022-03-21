import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import '../resources/items.css'

function Item({ item, item: { name, image, price } }) {

  const dispatch = useDispatch()
  
  const addToCart = () => {
    dispatch({
      type: 'addToCart',
      payload: { ...item, quantity: 1 }
    })
  }
  
  return (
    <div className='item'>
        <h4 className='name'>{name}</h4>
        <img 
            style={{ objectFit: 'contain'}}
            src={image} 
            alt={name} 
            height='100' 
            width='100' 
        />
        <h4 className='price'><b>Price: </b>{price} €/-</h4>
        <div className="d-flex justify-content-end">
            <Button className='mt-2' onClick={() => addToCart()}>Add to cart</Button>
        </div>
    </div>
  )
}

export default Item
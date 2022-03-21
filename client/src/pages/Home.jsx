import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd'
import Item from '../components/Item'

function Home() {

  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('fruits')
  const categories = [
    {
      name: 'fruits',
      imageURL: 'https://www.telemundo.com/sites/nbcutelemundo/files/images/promo/article/2017/04/13/naranja-manzana-y-otras-frutas-frescas.jpg'
    },
    {
      name: 'vegetables',
      imageURL: 'https://media.istockphoto.com/photos/food-background-with-assortment-of-fresh-organic-vegetables-picture-id1203599923?k=20&m=1203599923&s=170667a&w=0&h=LvOQlr2phnqGz0CvcsioFfvrMdQRsARRRpTaBfl4aoc='
    },
    {
      name: 'meat',
      imageURL: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/af/f552608f5111e3b74b0b94eba10f26/Course-Image.jpg?auto=format%2Ccompress&dpr=1'
    },
  ]
  const dispatch = useDispatch()
  
  const getAllItems = () => {
    dispatch({ type: 'showLoading' })
    axios.get('/api/items')
    .then(({ data }) => {
      dispatch({ type: 'hideLoading' })
      setItems(data)
    })
    .catch(error => {
      dispatch({ type: 'showLoading' })
      console.log(error)
    })
  }
  
  useEffect(() => {
    getAllItems()
  }, [])
  
  return (
    <DefaultLayout>
      <div className='category-wrapper d-flex'>
        {categories.map(({ name, imageURL }, index) => (
          <div 
            key={index} 
            className={`d-flex category ${selectedCategory === name && 'selected-category'}`}
            onClick={() => setSelectedCategory(name)}
          >
            <h4 style={{ textTransform: 'capitalize' }}>{name}</h4>
            <img src={imageURL} alt={name} width={80} />
          </div>
        ))}
      </div>
      <Row gutter={20}>  
        {items.filter(item => selectedCategory === item.category).map(item => (
          <Col key={item._id} span={6} xs={24} sm={6} md={12} lg={6} >
            <Item item={item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  )
}

export default Home
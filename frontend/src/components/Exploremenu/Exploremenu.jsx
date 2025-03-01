import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'

const Exploremenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis cumque voluptatem nisi aut, minima, atque dolores exercitationem commodi ut autem animi 
            quibusdam in corporis unde ipsam, nam voluptates fugiat. Officia!
        <div className="explore-menu-list">
            {menu_list.map((item,i)=>{
                return(
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={i} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":''} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                        </div>
                )
            })}
        </div>
        <hr/>
        </p>
    </div>
  )
}

export default Exploremenu
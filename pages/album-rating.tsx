import React , {useEffect,useState}from 'react'
import AlbumRatings from '../components/AlbumRatings'
import { useGetAlbumRatingQuery } from '../lib/userApi'


function AlbumRating() {
    console.log("hiii here 1");
    const [arrData , setArrData] = useState([])
    const { data, error, isLoading } = useGetAlbumRatingQuery('')
    console.log("dat from rtk query === data",data);
    let arr:any = []
    if(!isLoading){
        data.map((val:any)=>{
            let ox:any = {
                '1':0, '2':0 ,'3':0, '4':0 ,'5':0
            }
            val.items.map((vl:any)=>{
                if(ox[vl]) {
                    ox[vl] = ox[vl]+1

                } else {
                    ox[vl] = 1
                }

            })

            let obj = {
                totalCount:val.items.length,
                name:val.data[0].name[0],
                url:val.data[0].url[0],
                id:val._id[0],
                ratings:Object.values(ox)

            }
            arr.push(obj)

        })
        console.log('arrval is ',arr);
        

    }

 


  return (
    <div>
        <AlbumRatings data={arr}/>
    </div>
  )
}

export default AlbumRating
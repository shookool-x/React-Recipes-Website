import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './SkeletLoding.css'

export default function SkeletLoding() {
  return (
    <SkeletonTheme baseColor="#021526" highlightColor="#03346E">
      {/* <div className='skelet-grid'> */}
      {
        [...Array(8)].map((_, index) => (
          <div key={index} className='loaditem'>
            <div style={{ margin: "0 auto", lineHeight: "0.75" }}>
              <Skeleton width="50%" height={20} />
              <Skeleton width="30%" height={10} />
              <Skeleton count={5} width="100%" height={3} />
              <Skeleton width="50%" height={3} />
              <Skeleton width="30%" height={10} style={{ marginTop: "10px" }} />
            </div >
          </div>
        ))
      }
      {/* </div> */}
    </SkeletonTheme >

  )
}

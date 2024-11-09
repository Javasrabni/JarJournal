import CountTime from "../../../Footer/musicBox/countTime"
import Header from "../../../Navbar-Top/Header"


export default  function BrainFocusPage() {
    const bgBrainFocus = {
        backgroundImage: "url(/Assets/background/bg01.jpg)",
        backgroundSize: 'cover',
        backgroundPositionX: "-50px",
    }

    return (
        <div className="w-[360px] h-[100lvh] flex flex-col m-auto" style={{...bgBrainFocus}}>
                {/* <div className="w-full">
                    <Header />
                </div> */}
                <div className="w-full h-full flex justify-center items-center">
                    <div className="text-white w-full h-[50%]">
                        <CountTime 
                            BFPage={true}
                        />
                    </div>

                </div>
        </div>
    )
}
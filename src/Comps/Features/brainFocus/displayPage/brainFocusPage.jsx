import CountTime from "../../../Footer/musicBox/countTime"
import Header from "../../../Navbar-Top/Header"


export default  function BrainFocusPage() {
    const bgBrainFocus = {
        backgroundImage: "url(/Assets/background/bg-BF-NW.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    return (
        <div className="w-[360px] h-[100vh] flex flex-col m-auto" style={{...bgBrainFocus}}>
                {/* <div className="w-full">
                    <Header />
                </div> */}
                <div className="w-full h-full flex justify-center items-center">
                    <div className="text-white w-full h-full">
                        <CountTime 
                            BFPage={true}
                        />
                    </div>

                </div>
        </div>
    )
}
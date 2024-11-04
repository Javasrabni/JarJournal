import CountTime from "../../../Footer/musicBox/countTime"


export default  function BrainFocusPage() {
    const bgBrainFocus = {
        backgroundImage: "url(/Assets/background/bg01.jpg)",
        backgroundSize: 'cover'
    }

    return (
        <div className="w-[360px] h-[100lvh] flex m-auto" style={{...bgBrainFocus}}>
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
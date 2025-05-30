function Section() {
    return(
        <main>
            <div className="bestItems">
                <h1 className="bestTxt">베스트 상품</h1>
                <div className="itemList"></div>
            </div>
            <div className="sellItems">
                <h1 className="sellTxt">판매 중인 상품</h1>
                <div className="itemList"></div>
            </div>
            <div className="pageNum"></div>
        </main>
    )
}
import './Advantages.scss'

function Advantages() {
    return (
        <section className="advantages" id="advantages">
            <h2>Преимущества сервиса</h2>
            <div className="advantages__wrapper">
                <div className="wrapper">
                <div className="advantage-cards layout-2-columns">
                    <div className="advantage advantage_author">
                    <div className="">
                        <h3 className="advantage__title">Для Aвторов</h3>
                        <p className="advantage__text">Передача опыта</p>
                        <p className="advantage__text">Реклама работ</p>
                        <p className="advantage__text">Экономия времени</p>
                        <p className="advantage__text">Новые клиенты</p>
                    </div>
                    </div>
                    <div className="advantage advantage_user">
                    <h3 className="advantage__title">Для Учеников</h3>
                    <p className="advantage__text">Обучение новому</p>
                    <p className="advantage__text">Товары ручной работы</p>
                    <p className="advantage__text">Интересные находки</p>
                    <p className="advantage__text">Новые знакомства</p>
                    </div>
                </div>
                </div>
            </div>
     </section>
    )
}

export default Advantages;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Caracteristicas from '../Caracteristicas/Caracteristicas';


const getProductById = (id) => {
    const products = [
        {
            id: 1,
            title: 'Estadio Monumental',
            description: 'El Estadio Monumental cuenta con una cancha de césped natural de alta calidad, perfecta para partidos oficiales y eventos de gran escala. Ofrece una experiencia de juego óptima con un césped bien mantenido y una superficie nivelada.',
            price: 100,
            image: 'https://i.pinimg.com/originals/9c/76/c6/9c76c63586c831cb638e9de05f3f0748.jpg'
        },
        {
            id: 2,
            title: 'Complejo Deportivo La Bombonera',
            description: 'El Complejo Deportivo La Bombonera dispone de una cancha de césped sintético de última generación, ideal para partidos y entrenamientos intensivos. Con excelente drenaje y superficie antideslizante, asegura un juego seguro en cualquier clima.',
            price: 120,
            image: 'https://scontent.feze13-1.fna.fbcdn.net/v/t39.30808-6/306775986_467887492021542_685674761761631612_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5Xxohxoq8Y0Q7kNvgH3KWRG&_nc_ht=scontent.feze13-1.fna&oh=00_AYBuw_xZZ-VOjzucWA_diii-1SvkXmcws3fbgQy-71v4Bw&oe=665D714E'
        },
        {
            id: 3,
            title: 'Estadio Santiago Bernabéu',
            description: 'El Estadio Santiago Bernabéu ofrece una cancha con césped natural, cuidada hasta el más mínimo detalle para ofrecer la mejor experiencia de juego posible. Perfecta para partidos oficiales de alto nivel.',
            price: 140,
            image: 'https://cicadexgreendex.com/wp-content/uploads/2021/03/Proyecto-Cicadex-Greendex-Proquinal-3.jpg'
        },
        {
            id: 4,
            title: 'Cancha Central del Camp Nou',
            description: 'La cancha central del Camp Nou es una de las mejores del mundo, con un césped natural impecable y una superficie de juego de primer nivel. Ideal para partidos y eventos de alta categoría.',
            price: 160,
            image: 'https://www.soho.co/resizer/v2/2IVRXQSL2FHRBKCGKILGUCWTY4.jpg?auth=40962d96da7cdfc0efca0a0d49cc02f29c2d2220964287d486008fa2e679a987&smart=true&quality=75&width=1280&height=720'
        },
        {
            id: 5,
            title: 'Campo de Entrenamiento de Valdebebas',
            description: 'El campo de entrenamiento de Valdebebas está diseñado para sesiones de práctica intensivas, con césped sintético de alta calidad y equipamiento adicional para ejercicios de agilidad y precisión.',
            price: 180,
            image: 'https://www.qhubobogota.com/wp-content/uploads/2023/07/Asi-de-breve-puede-apartar-una-cancha-con-el-distrito.jpg'
        },
        {
            id: 6,
            title: 'Estadio Azteca',
            description: 'El Estadio Azteca cuenta con una cancha de césped natural de primer nivel, ideal para partidos internacionales y eventos de gran envergadura. Ofrece una superficie de juego excepcional.',
            price: 200,
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 7,
            title: 'Cancha de Fútbol Playa Copacabana',
            description: 'La cancha de fútbol playa Copacabana está ubicada en una de las playas más famosas del mundo, con arena fina y un ambiente perfecto para partidos de fútbol playa. Ideal para torneos de verano y eventos al aire libre.',
            price: 220,
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 8,
            title: 'Cancha Infantil de Chiquititas',
            description: 'La cancha infantil de Chiquititas está diseñada para los más pequeños, con césped sintético suave y medidas adaptadas para niños. Perfecta para entrenamientos y partidos de fútbol infantil.',
            price: 240,
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 9,
            title: 'Cancha Urbana del Barrio Chino',
            description: 'Ubicada en el corazón del Barrio Chino, esta cancha urbana es ideal para partidos rápidos y dinámicos. Con un diseño moderno y una superficie sintética resistente, es perfecta para jugadores urbanos.',
            price: 260,
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 10,
            title: 'Campo de Fútbol Municipal',
            description: 'El campo de fútbol municipal es una instalación pública con una cancha de césped natural bien cuidada, perfecta para ligas locales y entrenamientos. Ofrece una superficie de juego cómoda y segura.',
            price: 280,
            image: 'https://via.placeholder.com/150'
        },
    ];
    return products.find(product => product.id === parseInt(id));
}

const Detail = () => {
    const { id } = useParams();
    const [productSelected, setProductSelected] = useState(null);

    useEffect(() => {
        const getData = async () => {
            let productData = getProductById(id);
            setProductSelected(productData);
        }
        getData();
    }, [id]);

    if (!productSelected) return <div className="flex items-center justify-center h-screen">
        <div className="text-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-xl font-semibold">Cargando...</h2>
        </div>
    </div>;

    return (
        <div className="container mx-auto my-20 p-5 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex justify-center">
                    <img
                        src={productSelected.image}
                        alt={productSelected.title}
                        className="w-64 h-64 object-cover rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{productSelected.title}</h1>
                    <p className="text-gray-700 text-lg mb-4">{productSelected.description}</p>
                    <div className="text-2xl font-semibold text-green-600 mb-4">${productSelected.price}</div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all duration-300">
                       Reservar Cancha
                    </button>
                </div>
            </div>
            <Caracteristicas/>
        </div>
    );
}

export default Detail;

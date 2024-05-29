
import { useState } from 'react';
import ProductCard from '../../Components/PorductCard/ProductCard';

const products = [
    { id: 1, name: 'Estadio Monumental', description: 'Descripción', category: 'Fútbol', price: 100, image: 'https://i.pinimg.com/originals/9c/76/c6/9c76c63586c831cb638e9de05f3f0748.jpg' },
    { id: 2, name: 'Complejo Deportivo La Bombonera', description: 'Descripción', category: 'Fútbol', price: 120, image: 'https://scontent.feze13-1.fna.fbcdn.net/v/t39.30808-6/306775986_467887492021542_685674761761631612_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5Xxohxoq8Y0Q7kNvgH3KWRG&_nc_ht=scontent.feze13-1.fna&oh=00_AYBuw_xZZ-VOjzucWA_diii-1SvkXmcws3fbgQy-71v4Bw&oe=665D714E' },
    { id: 3, name: 'Estadio Santiago Bernabéu', description: 'Descripción', category: 'Fútbol', price: 140, image: 'https://scontent.feze13-1.fna.fbcdn.net/v/t1.6435-9/86860303_10156587616895356_7007326185231220736_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=exi4CKgpyJcQ7kNvgH9nyPu&_nc_ht=scontent.feze13-1.fna&oh=00_AYDLuvH3oVCqkJbmOoEsIOTI4QO8K-Rjh2i5ZQaiC-1-SQ&oe=667EFA78' },
    { id: 4, name: 'Cancha Central del Camp Nou', description: 'Descripción', category: 'Fútbol', price: 160, image: 'https://sportsolution.co/wp-content/uploads/2019/03/PALERMO.jpg' },
    { id: 5, name: 'Campo de Entrenamiento de Valdebebas', description: 'Descripción', category: 'Fútbol', price: 180, image: 'https://bosphorussport.com/wp-content/uploads/2022/08/igdir-1.jpg' },
    { id: 6, name: 'Estadio Azteca', description: 'Descripción', category: 'Fútbol', price: 200, image: 'https://scontent.feze13-1.fna.fbcdn.net/v/t1.6435-9/87172932_10156587617185356_2290308597835366400_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1aP_WkENIXcQ7kNvgFPaT4o&_nc_ht=scontent.feze13-1.fna&oh=00_AYD69cj67OUZfmRTPxfawWWP3O2yBsKHikVng2Gz62-p6A&oe=667F14B8' },
    { id: 7, name: 'Cancha de Fútbol Playa Copacabana', description: 'Descripción', category: 'Fútbol', price: 220, image: 'https://i.pinimg.com/originals/9c/76/c6/9c76c63586c831cb638e9de05f3f0748.jpg' },
    { id: 8, name: 'Cancha Infantil de Chiquititas', description: 'Descripción', category: 'Fútbol', price: 240, image: 'https://scontent.feze13-1.fna.fbcdn.net/v/t39.30808-6/306775986_467887492021542_685674761761631612_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5Xxohxoq8Y0Q7kNvgH3KWRG&_nc_ht=scontent.feze13-1.fna&oh=00_AYBuw_xZZ-VOjzucWA_diii-1SvkXmcws3fbgQy-71v4Bw&oe=665D714E' },
    { id: 9, name: 'Cancha Urbana del Barrio Chino', description: 'Descripción', category: 'Fútbol', price: 260, image: 'https://bosphorussport.com/wp-content/uploads/2022/08/igdir-1.jpg' },
    { id: 10, name: 'Campo de Fútbol Municipal', description: 'Descripción', category: 'Fútbol', price: 280, image: 'https://i.pinimg.com/originals/9c/76/c6/9c76c63586c831cb638e9de05f3f0748.jpg' },
];

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="mt-20 ml-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {[...Array(totalPages).keys()].map(number => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`mx-1 mb-5 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
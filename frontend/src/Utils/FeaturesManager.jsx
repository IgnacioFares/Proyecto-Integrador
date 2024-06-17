const resolveArray = (array) => {
    return array[0] == undefined || 
      (array.length > 1 
        ? array.map((caracteristica) => (
            <img key={caracteristica.id} className="max-w-6" src={caracteristica.logoUrl}></img>
        )) 
        : <img key={array[0].id} className="max-w-6" src={array[0].logoUrl}></img>);
}

export default resolveArray;
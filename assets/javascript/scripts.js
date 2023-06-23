var contraste = () => {
    let body = document.body;
    let navbar = document.querySelector('.navbar');
    let cards = document.querySelectorAll('.card');
    let textoContacto = document.querySelectorAll('#contact *');

    if (body.classList.contains('blanco')) {
        body.classList.remove('blanco');
        body.classList.add('negro');
        navbar.classList.remove('bg-light');
        navbar.classList.add('bg-dark');
        cards.forEach(card => card.classList.add('negro'));
        textoContacto.forEach(element => element.classList.add('negro'));
    } else {
        body.classList.remove('negro');
        body.classList.add('blanco');
        navbar.classList.remove('bg-dark');
        navbar.classList.add('bg-light');
        cards.forEach(card => card.classList.remove('negro'));
        textoContacto.forEach(element => element.classList.remove('negro'));
    }
}

var fuente = ()=>{
    let btn = document.getElementById('btnFuente');
    if(btn.value == '0'){
        let elements = document.getElementsByClassName("small-letras");
        const largo = elements.length;
        for(let i = 0; i < elements.length; i++){
            let element = elements[0];
            console.log(element)
            element.classList.replace('small-letras','medium-letras')
        }
        btn.value = '1'
    }
    else if(btn.value =='1'){
        let elements = document.getElementsByClassName("medium-letras");
        const largo = elements.length;
        for(let i = 0; i < largo; i++){
            let element = elements[0];
            console.log(element)
            element.classList.replace('medium-letras','large-letras')
        }
        btn.value = '2';
    }
    else if(btn.value == '2'){
        let elements = document.getElementsByClassName("large-letras");
        const largo = elements.length;
        for(let i = 0; i < largo; i++){
            let element = elements[0];
            console.log(element)
            element.classList.replace('large-letras','small-letras')
        }
        btn.value = '0';
    }

}
document.getElementById('btn-contraste').addEventListener('click', contraste);
document.getElementById("btnFuente").addEventListener('click',fuente);
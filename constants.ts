import { Category, Language } from './types';

const CATEGORIES_ES: Category[] = [
  {
    id: 'animals',
    name: 'Animales',
    words: ['León', 'Elefante', 'Jirafa', 'Pingüino', 'Delfín', 'Águila', 'Koala', 'Tigre', 'Oso Panda', 'Canguro', 'Lobo', 'Zorro', 'Camello', 'Murciélago', 'Hipopótamo', 'Gorila', 'Serpiente', 'Cocodrilo', 'Búho', 'Gato']
  },
  {
    id: 'cities',
    name: 'Ciudades del Mundo',
    words: ['París', 'Nueva York', 'Tokio', 'Londres', 'Roma', 'Barcelona', 'Sídney', 'El Cairo', 'Río de Janeiro', 'Moscú', 'Dubái', 'Los Ángeles', 'Berlín', 'Toronto', 'Buenos Aires', 'Ciudad de México', 'Estambul', 'Bangkok', 'Seúl', 'Madrid']
  },
  {
    id: 'food',
    name: 'Comida',
    words: ['Pizza', 'Sushi', 'Hamburguesa', 'Tacos', 'Paella', 'Pasta', 'Helado', 'Chocolate', 'Ensalada', 'Sopa', 'Curry', 'Filete', 'Queso', 'Pan', 'Fruta', 'Pastel', 'Arroz', 'Huevo', 'Sandwich', 'Palomitas']
  },
  {
    id: 'objects',
    name: 'Objetos de Casa',
    words: ['Silla', 'Mesa', 'Cama', 'Lámpara', 'Espejo', 'Reloj', 'Sofá', 'Televisión', 'Refrigerador', 'Horno', 'Microondas', 'Lavadora', 'Almohada', 'Manta', 'Llave', 'Puerta', 'Ventana', 'Ordenador', 'Teléfono', 'Taza']
  },
  {
    id: 'jobs',
    name: 'Profesiones',
    words: ['Médico', 'Bombero', 'Policía', 'Profesor', 'Ingeniero', 'Artista', 'Cocinero', 'Piloto', 'Abogado', 'Carpintero', 'Astronauta', 'Veterinario', 'Dentista', 'Periodista', 'Actor', 'Músico', 'Enfermero', 'Arquitecto', 'Científico', 'Electricista']
  },
  {
    id: 'sports',
    name: 'Deportes',
    words: ['Fútbol', 'Baloncesto', 'Tenis', 'Natación', 'Golf', 'Boxeo', 'Voleibol', 'Béisbol', 'Rugby', 'Atletismo', 'Ciclismo', 'Esquí', 'Surf', 'Karate', 'Gimnasia', 'Hockey', 'Badminton', 'Escalada', 'Patinaje', 'Judo']
  },
  {
    id: 'movies',
    name: 'Géneros de Cine',
    words: ['Acción', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción', 'Romance', 'Aventura', 'Musical', 'Documental', 'Animación', 'Fantasía', 'Suspense', 'Oeste', 'Guerra', 'Crimen', 'Biografía', 'Misterio', 'Historia', 'Deporte', 'Familia']
  },
  {
    id: 'transport',
    name: 'Transporte',
    words: ['Coche', 'Autobús', 'Tren', 'Avión', 'Barco', 'Bicicleta', 'Moto', 'Helicóptero', 'Submarino', 'Camión', 'Taxi', 'Metro', 'Tranvía', 'Patinete', 'Cohete', 'Globo', 'Caravana', 'Yate', 'Tractor', 'Furgoneta']
  },
  {
    id: 'instruments',
    name: 'Instrumentos',
    words: ['Guitarra', 'Piano', 'Violín', 'Batería', 'Trompeta', 'Flauta', 'Saxofón', 'Arpa', 'Clarinete', 'Bajo', 'Acordeón', 'Ukelele', 'Trombón', 'Oboe', 'Xilófono', 'Maracas', 'Pandereta', 'Gaita', 'Armónica', 'Teclado']
  },
  {
    id: 'clothes',
    name: 'Ropa',
    words: ['Camiseta', 'Pantalón', 'Vestido', 'Falda', 'Abrigo', 'Sombrero', 'Zapatos', 'Calcetines', 'Guantes', 'Bufanda', 'Chaqueta', 'Traje', 'Corbata', 'Cinturón', 'Pijama', 'Bañador', 'Sudadera', 'Botas', 'Sandalias', 'Gorra']
  },
  {
    id: 'colors',
    name: 'Colores',
    words: ['Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja', 'Rosa', 'Morado', 'Negro', 'Blanco', 'Gris', 'Marrón', 'Turquesa', 'Dorado', 'Plateado', 'Beige', 'Violeta', 'Índigo', 'Escarlata', 'Lima', 'Cian']
  },
  {
    id: 'fruits',
    name: 'Frutas',
    words: ['Manzana', 'Plátano', 'Naranja', 'Fresa', 'Uva', 'Sandía', 'Melón', 'Piña', 'Kiwi', 'Mango', 'Pera', 'Melocotón', 'Cereza', 'Limón', 'Coco', 'Ciruela', 'Higo', 'Papaya', 'Frambuesa', 'Mandarina']
  },
  {
    id: 'weather',
    name: 'Clima',
    words: ['Sol', 'Lluvia', 'Nube', 'Nieve', 'Viento', 'Tormenta', 'Niebla', 'Granizo', 'Arcoiris', 'Rayo', 'Trueno', 'Huracán', 'Tornado', 'Calor', 'Frío', 'Humedad', 'Sequía', 'Rocío', 'Escarcha', 'Brisa']
  },
  {
    id: 'school',
    name: 'Escuela',
    words: ['Libro', 'Cuaderno', 'Lápiz', 'Bolígrafo', 'Goma', 'Regla', 'Mochila', 'Pizarra', 'Pupitre', 'Tijeras', 'Pegamento', 'Mapa', 'Globo Terráqueo', 'Ordenador', 'Calculadora', 'Diccionario', 'Examen', 'Recreo', 'Profesor', 'Alumno']
  },
  {
    id: 'nature',
    name: 'Naturaleza',
    words: ['Árbol', 'Flor', 'Río', 'Montaña', 'Mar', 'Playa', 'Bosque', 'Desierto', 'Volcán', 'Cueva', 'Lago', 'Cascada', 'Valle', 'Isla', 'Selva', 'Prado', 'Piedra', 'Arena', 'Tierra', 'Cielo']
  }
];

const CATEGORIES_EN: Category[] = [
  {
    id: 'animals',
    name: 'Animals',
    words: ['Lion', 'Elephant', 'Giraffe', 'Penguin', 'Dolphin', 'Eagle', 'Koala', 'Tiger', 'Panda Bear', 'Kangaroo', 'Wolf', 'Fox', 'Camel', 'Bat', 'Hippo', 'Gorilla', 'Snake', 'Crocodile', 'Owl', 'Cat']
  },
  {
    id: 'cities',
    name: 'World Cities',
    words: ['Paris', 'New York', 'Tokyo', 'London', 'Rome', 'Barcelona', 'Sydney', 'Cairo', 'Rio de Janeiro', 'Moscow', 'Dubai', 'Los Angeles', 'Berlin', 'Toronto', 'Buenos Aires', 'Mexico City', 'Istanbul', 'Bangkok', 'Seoul', 'Madrid']
  },
  {
    id: 'food',
    name: 'Food',
    words: ['Pizza', 'Sushi', 'Burger', 'Tacos', 'Paella', 'Pasta', 'Ice Cream', 'Chocolate', 'Salad', 'Soup', 'Curry', 'Steak', 'Cheese', 'Bread', 'Fruit', 'Cake', 'Rice', 'Egg', 'Sandwich', 'Popcorn']
  },
  {
    id: 'objects',
    name: 'Household Objects',
    words: ['Chair', 'Table', 'Bed', 'Lamp', 'Mirror', 'Clock', 'Sofa', 'TV', 'Fridge', 'Oven', 'Microwave', 'Washing Machine', 'Pillow', 'Blanket', 'Key', 'Door', 'Window', 'Computer', 'Phone', 'Cup']
  },
  {
    id: 'jobs',
    name: 'Professions',
    words: ['Doctor', 'Firefighter', 'Police', 'Teacher', 'Engineer', 'Artist', 'Chef', 'Pilot', 'Lawyer', 'Carpenter', 'Astronaut', 'Vet', 'Dentist', 'Journalist', 'Actor', 'Musician', 'Nurse', 'Architect', 'Scientist', 'Electrician']
  },
  {
    id: 'sports',
    name: 'Sports',
    words: ['Soccer', 'Basketball', 'Tennis', 'Swimming', 'Golf', 'Boxing', 'Volleyball', 'Baseball', 'Rugby', 'Athletics', 'Cycling', 'Skiing', 'Surfing', 'Karate', 'Gymnastics', 'Hockey', 'Badminton', 'Climbing', 'Skating', 'Judo']
  },
  {
    id: 'movies',
    name: 'Movie Genres',
    words: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Adventure', 'Musical', 'Documentary', 'Animation', 'Fantasy', 'Thriller', 'Western', 'War', 'Crime', 'Biography', 'Mystery', 'History', 'Sport', 'Family']
  },
  {
    id: 'transport',
    name: 'Transport',
    words: ['Car', 'Bus', 'Train', 'Plane', 'Boat', 'Bike', 'Motorcycle', 'Helicopter', 'Submarine', 'Truck', 'Taxi', 'Subway', 'Tram', 'Scooter', 'Rocket', 'Balloon', 'Caravan', 'Yacht', 'Tractor', 'Van']
  },
  {
    id: 'instruments',
    name: 'Instruments',
    words: ['Guitar', 'Piano', 'Violin', 'Drums', 'Trumpet', 'Flute', 'Saxophone', 'Harp', 'Clarinet', 'Bass', 'Accordion', 'Ukulele', 'Trombone', 'Oboe', 'Xylophone', 'Maracas', 'Tambourine', 'Bagpipes', 'Harmonica', 'Keyboard']
  },
  {
    id: 'clothes',
    name: 'Clothes',
    words: ['T-Shirt', 'Pants', 'Dress', 'Skirt', 'Coat', 'Hat', 'Shoes', 'Socks', 'Gloves', 'Scarf', 'Jacket', 'Suit', 'Tie', 'Belt', 'Pajamas', 'Swimsuit', 'Hoodie', 'Boots', 'Sandals', 'Cap']
  },
  {
    id: 'colors',
    name: 'Colors',
    words: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Pink', 'Purple', 'Black', 'White', 'Gray', 'Brown', 'Turquoise', 'Gold', 'Silver', 'Beige', 'Violet', 'Indigo', 'Scarlet', 'Lime', 'Cyan']
  },
  {
    id: 'fruits',
    name: 'Fruits',
    words: ['Apple', 'Banana', 'Orange', 'Strawberry', 'Grape', 'Watermelon', 'Melon', 'Pineapple', 'Kiwi', 'Mango', 'Pear', 'Peach', 'Cherry', 'Lemon', 'Coconut', 'Plum', 'Fig', 'Papaya', 'Raspberry', 'Tangerine']
  },
  {
    id: 'weather',
    name: 'Weather',
    words: ['Sun', 'Rain', 'Cloud', 'Snow', 'Wind', 'Storm', 'Fog', 'Hail', 'Rainbow', 'Lightning', 'Thunder', 'Hurricane', 'Tornado', 'Heat', 'Cold', 'Humidity', 'Drought', 'Dew', 'Frost', 'Breeze']
  },
  {
    id: 'school',
    name: 'School',
    words: ['Book', 'Notebook', 'Pencil', 'Pen', 'Eraser', 'Ruler', 'Backpack', 'Blackboard', 'Desk', 'Scissors', 'Glue', 'Map', 'Globe', 'Computer', 'Calculator', 'Dictionary', 'Exam', 'Recess', 'Teacher', 'Student']
  },
  {
    id: 'nature',
    name: 'Nature',
    words: ['Tree', 'Flower', 'River', 'Mountain', 'Sea', 'Beach', 'Forest', 'Desert', 'Volcano', 'Cave', 'Lake', 'Waterfall', 'Valley', 'Island', 'Jungle', 'Meadow', 'Stone', 'Sand', 'Earth', 'Sky']
  }
];

export const getCategories = (lang: Language): Category[] => {
  return lang === 'en' ? CATEGORIES_EN : CATEGORIES_ES;
};

export const CATEGORIES = CATEGORIES_ES; // Default for backward compatibility if needed, but we should use getCategories

export const MIN_PLAYERS = 3;
export const DEFAULT_MAX_ROUNDS = 5;


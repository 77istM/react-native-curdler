import { MaterialIcons } from '@expo/vector-icons';

const Icons = {};

const Add = () => <MaterialIcons name='add' size={16} />;
const Close = () => <MaterialIcons name='close' size={16} />;
const Delete = () => <MaterialIcons name='delete' size={16} />;
const Edit = () => <MaterialIcons name='edit' size={16} />;
const Submit = () => <MaterialIcons name='check' size={16} />;
const Heart = () => <MaterialIcons name='favorite' size={24} color='crimson' />;
const HeartOutline = () => <MaterialIcons name='favorite-border' size={24} color='grey' />;
const Menu = () => <MaterialIcons name='menu' size={24} color='white' />; 

// Compose
Icons.Add = Add;
Icons.Close = Close;
Icons.Delete = Delete;
Icons.Edit = Edit;
Icons.Submit = Submit;
Icons.Heart = Heart;
Icons.HeartOutline = HeartOutline;
Icons.Menu = Menu; 

export default Icons;
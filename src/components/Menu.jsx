const Menu = () => {
    const userRole = localStorage.getItem('userRole');
    let htmla = '';
    if (userRole === 'admin') {
        htmla = 'Eres administrador';
      } else if (userRole === 'user') {
        htmla = 'Eres administrador';
      } else {
        htmla = 'No sé que haces acá';
      }
    return (
        <div> 
        {userRole == 'admin' ? (
            <>
              <span>Eres admin</span>
              
            </>
          ) : <span>Eres usuario</span>}
        </div>
     );
}
 
export default Menu;
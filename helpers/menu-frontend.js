const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-hand-pointing-right',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'RxJs', url: 'rxjs' },
            ],
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Medicos', url: 'medicos' },
            ],
        },
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}
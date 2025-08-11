export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', 
        menus: [
            {
                name: 'menu.admin.crud' , link: '/system/user-manage'  
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' }
                // ]
            },
            {
                name: 'menu.admin.crud-redux' , link: '/system/user-manage-redux'  
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' }
                // ]
            },
            {
                name: 'menu.admin.manage-doctor' , link: '/system/doctor-manage' 
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' }
                // ]
            },
            {
                name: 'menu.admin.manage-admin' , link: '/system/admin-manage' 
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' }
                // ]
            },
            { 
                name: 'menu.doctor.manage-schedule' , link: '/doctor/manage-schedule'  
            }
        ],
    },
    {
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic' , link: '/system/clinic-manage'  
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' }
                // ]
            },
        ]
    },
    {
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty' , link: '/system/specialty-manage'  
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' }
                // ]
            },
        ]
    },
    {
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook' , link: '/system/handbook-manage'  
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' }
                // ]
            },
        ]
    },
];
export const doctorMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', 
        menus: [
                {
                    name: 'menu.doctor.manage-schedule' , link: '/doctor/manage-schedule'  
                },  
                {
                    name: 'menu.doctor.manage-patient' , link: '/doctor/manage-patient'  
                },  
        ],
    },
];

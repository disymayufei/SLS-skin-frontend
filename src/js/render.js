let hideNodeCache = {};

class RenderUtil {
    constructor() {
        // 输出广告
        console.log(`
                  _____                        _____                 _____          
                 /\\    \\                      /\\    \\               /\\    \\         
                /::\\    \\                    /::\\____\\             /::\\    \\        
               /::::\\    \\                  /:::/    /            /::::\\    \\       
              /::::::\\    \\                /:::/    /            /::::::\\    \\      
             /:::/\\:::\\    \\              /:::/    /            /:::/\\:::\\    \\     
            /:::/__\\:::\\    \\            /:::/    /            /:::/__\\:::\\    \\    
            \\:::\\   \\:::\\    \\          /:::/    /             \\:::\\   \\:::\\    \\   
          ___\\:::\\   \\:::\\    \\        /:::/    /            ___\\:::\\   \\:::\\    \\  
         /\\   \\:::\\   \\:::\\    \\      /:::/    /            /\\   \\:::\\   \\:::\\    \\ 
        /::\\   \\:::\\   \\:::\\____\\    /:::/____/            /::\\   \\:::\\   \\:::\\____\\
        \\:::\\   \\:::\\   \\::/    /    \\:::\\    \\            \\:::\\   \\:::\\   \\::/    /
         \\:::\\   \\:::\\   \\/____/      \\:::\\    \\            \\:::\\   \\:::\\   \\/____/ 
          \\:::\\   \\:::\\    \\           \\:::\\    \\            \\:::\\   \\:::\\    \\     
           \\:::\\   \\:::\\____\\           \\:::\\    \\            \\:::\\   \\:::\\____\\    
            \\:::\\  /:::/    /            \\:::\\    \\            \\:::\\  /:::/    /    
             \\:::\\/:::/    /              \\:::\\    \\            \\:::\\/:::/    /     
              \\::::::/    /                \\:::\\    \\            \\::::::/    /      
               \\::::/    /                  \\:::\\____\\            \\::::/    /       
                \\::/    /                    \\::/    /             \\::/    /        
                 \\/____/                      \\/____/               \\/____/         
                 
                 
        想来一起开发？抑或发现了网页的Bug/可优化之处？StarLight-Server欢迎你的加入！
        我们的QQ群：535392227，加群请注明：来自console输出信息！
        `);
    };

    sidebarElements = [
        {
            "id": "home-btn",
            "text": "首页",
            "href": "/#/main",
            "img": {
                "src": "/src/assets/icon/home.svg",
                "alt": "Home"
            }
        },
        {
            "id": "skin-btn",
            "text": "我的衣柜",
            "img": {
                "src": "/src/assets/icon/skin.svg",
                "alt": "Skin"
            }
        },
        {
            "id": "personal-btn",
            "text": "个人中心",
            "img": {
                "src": "/src/assets/icon/personal.svg",
                "alt": "Personal"
            }
        },
        {
            "id": "skin-lib-btn",
            "text": "皮肤库",
            "split": true,
            "img": {
                "src": "/src/assets/icon/lib.svg",
                "alt": "Lib"
            }
        },
        {
            "id": "sls-btn",
            "text": "SLS官网",
            "href": "https://www.starlight.cool",
            "split": true,
            "img": {
                "src": "/src/assets/icon/star.svg",
                "alt": "SLS-Website"
            }
        },
        {
            "id": "logout-btn",
            "text": "登出",
            "img": {
                "src": "/src/assets/icon/logout.svg",
                "alt": "Logout"
            }
        }
    ];

    adminSidebarElement = [
        {
            "id": "home-btn",
            "text": "首页",
            "img": {
                "src": "/src/assets/icon/home.svg",
                "alt": "Home"
            }
        },
        {
            "id": "skin-btn",
            "text": "我的衣柜",
            "img": {
                "src": "/src/assets/icon/skin.svg",
                "alt": "Skin"
            }
        },
        {
            "id": "personal-btn",
            "text": "个人中心",
            "img": {
                "src": "/src/assets/icon/personal.svg",
                "alt": "Personal"
            }
        },
        {
            "id": "skin-lib-btn",
            "text": "皮肤库",
            "img": {
                "src": "/src/assets/icon/lib.svg",
                "alt": "Lib"
            }
        },
        {
            "id": "sls-btn",
            "text": "SLS官网",
            "href": "https://www.starlight.cool",
            "split": true,
            "img": {
                "src": "/src/assets/icon/star.svg",
                "alt": "SLS-Website"
            }
        },
        {
            "id": "sls-btn",
            "text": "SLS官网",
            "href": "https://www.starlight.cool",
            "img": {
                "src": "/src/assets/icon/star.svg",
                "alt": "SLS-Website"
            }
        },
        {
            "id": "logout-btn",
            "text": "登出",
            "img": {
                "src": "/src/assets/icon/logout.svg",
                "alt": "Logout"
            }
        }
    ];


    /**
     * 为DOM元素创建渐隐效果
     * @param element DOM元素
     * @param timeout 渐隐效果持续时间
     * @param needClearLater 是否需要清空元素中全部的其他DOM元素
     */
    fadeOut(element, timeout, needClearLater) {
        let opacityPercent = 100;
        element.style.transition = "opacity 1ms";

        let currentTime = Date.now();

        let rid = setInterval(function (){
            element.style.opacity = (opacityPercent / 100).toString();
            opacityPercent -= Math.ceil(100 / timeout) * (Date.now() - currentTime);

            if (opacityPercent < 0) {
                if(needClearLater){
                    element.innerHTML = "";
                }

                this.hide(element);

                clearInterval(rid);
            }

            currentTime = Date.now();
        }, 1);
    };

    /**
     * 为DOM元素创建渐显效果
     * @param element DOM元素
     * @param timeout 渐显效果持续时间
     * @param displayType 恢复显示时，该DOM元素的display类型（默认为unset）
     */
    fadeIn(element, timeout, displayType) {
        element.style.transition = "opacity 1ms";
        element.style.opacity = "0";

        let opacityPercent = 0;

        if (displayType === undefined) {
            this.show(element);
        }
        else {
            element.style.display = displayType;
        }

        let currentTime = Date.now();

        let rid = setInterval(function (){
            element.style.opacity = (opacityPercent / 100).toString();
            opacityPercent += (100 / timeout) * (Date.now() - currentTime);

            if (opacityPercent > 100) {
                element.style.opacity = "";
                element.style.transition = "";
                clearInterval(rid);
            }

            currentTime = Date.now();
        }, 1);
    };

    /**
     * 即刻隐藏DOM元素
     * @param element DOM元素
     */
    hide(element) {
        hideNodeCache[element] = element.style.display;
        element.style.display = "none";
    };

    /**
     * 即刻恢复DOM元素的显示
     * @param element DOM元素
     */
    show(element){
        if(element in hideNodeCache){
            element.style.display = hideNodeCache[element];
        }
        else {
            element.style.display = "";
        }
    }
}

let renderUtil = new RenderUtil();

export default renderUtil;
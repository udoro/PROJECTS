// automatically rename the text on back button to show the panel name  
//e.g. 'back to reviews' instead of the default text 'back' 
const updateBackText = 1; // true (1) or false (0)

// calculate header height for mobile menu top offset 
const calcHeaderHeight = 1; // true (1) or false (0)

// Breakpoint to calculate header height 
const mq = window.matchMedia( "(max-width: 1024px)" );
// You must match this value with the mobile media queries  
//and it should be 1px lower than the desktop media query in the CSS 
// if max-width is 1024px, then min-width should 1025px 


document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector("header");
    const navTrigger = document.querySelector(".dwc-nav-trigger");
    const mobileMenuOverlay = document.querySelector(".dwc-mobile-menu-overlay");
    const body = document.body;
    const select = selector => document.querySelectorAll(selector);

    // Set the id attribute for the header element
    header.id = 'dwc-header';

  
    const goHome = () => select('.dwc-sidebar__nav__panel').forEach(nPanel => {
        nPanel.classList.remove('dwc-slide-left');
        if (!nPanel.classList.contains('dwc-sidebar__nav__panel--home')) {
            nPanel.classList.add('dwc-slide-right');
            nPanel.inert = true;
        } else {
            nPanel.inert = false;
            header.setAttribute('tabindex', 0);
            header.focus()
        }
        select('.dwc-sidebar__nav__btn:not(.dwc-nav__back-btn)').forEach(sbtn => {
            sbtn.setAttribute('aria-expanded', 'false');
        })
    });
    select('.dwc-nav__home-btn').forEach(hbtn => hbtn.addEventListener('click', goHome));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            if (body.classList.contains('dwc-slide-nav-open')) {
                navTrigger.click()
                goHome();
                navTrigger.focus()
            } else {
                goHome();
            }
        }
    });
    select('.dwc-sidebar__nav__btn:not(.dwc-nav__back-btn)').forEach(sbtn => {
        sbtn.setAttribute('aria-expanded', 'false');
        sbtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const targetId = this.getAttribute('title');
            const targetElement = document.querySelector(`.dwc-sidebar__nav__panel[title="${targetId}"]`);
            const parentPanel = this.closest('.dwc-sidebar__nav__panel');
            targetElement.classList.remove('dwc-slide-right');
            targetElement.inert = false;
            targetElement.setAttribute('tabindex', 0);
            targetElement.focus();
            ariaExpanded = !targetElement.classList.contains('dwc-slide-right');
            sbtn.setAttribute('aria-expanded', ariaExpanded);
            select('.dwc-nav__back-btn').forEach(bbtn => {
                bbtn.addEventListener('click', function(e) {
                    ariaExpanded = !targetElement.classList.contains('dwc-slide-right');
                    sbtn.setAttribute('aria-expanded', ariaExpanded);
                })
            })
            if (!parentPanel.classList.contains('dwc-slide-right')) {
                parentPanel.classList.add('dwc-slide-left');
                parentPanel.inert = true;
            }
        });
    })
    select('.dwc-nav__back-btn').forEach(bbtn => {
        const btnTitle = bbtn.getAttribute('title');
        bbtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const returnBtnAttr = this.getAttribute('title');
            select('[title].dwc-sidebar__nav__panel').forEach(returnTarget => {
                if (returnTarget.getAttribute('title') === returnBtnAttr) {
                    returnTarget.classList.remove('dwc-slide-left');
                    returnTarget.inert = false;
                    if (returnTarget.classList.contains('dwc-sidebar__nav__panel--home')) {
                        header.setAttribute('tabindex', 0);
                        header.focus()
                    } else {
                        returnTarget.setAttribute('tabindex', 0);
                        returnTarget.focus();
                    }
                    if (returnTarget.classList.contains('dwc-slide-right')) {
                        returnTarget.classList.remove('dwc-slide-right');
                    }
                }
            });
            const parentPanel = this.closest('.dwc-sidebar__nav__panel');
            parentPanel.classList.add('dwc-slide-right');
            parentPanel.inert = true;
        });
        bbtn.setAttribute('aria-label', 'Go back to ' + btnTitle + ' menu');
    });
    select('.dwc-sidebar__nav__panel').forEach(panel => {
        const panelTitle = panel.getAttribute('title');
        panel.setAttribute('aria-label', panelTitle + ' menu');
    });
    if (updateBackText) {
        select('.dwc-nav__back-btn').forEach(btn => btn.querySelector('.dwc-nav__back__text').textContent = 'back to ' + btn.getAttribute('title'));
    }
    navTrigger.addEventListener("click", function() {
        body.classList.toggle("dwc-slide-nav-open");
        const isNavOpen = body.classList.contains("dwc-slide-nav-open");
        navTrigger.setAttribute("aria-expanded", isNavOpen);
    });
    mobileMenuOverlay.addEventListener("click", function() {
        body.classList.remove("dwc-slide-nav-open");
        navTrigger.setAttribute("aria-expanded", false);
    });
    const sidebarNavPanels = document.querySelectorAll(".dwc-sidebar__nav__panel");

    function updateSidebarPadding() {
        const headerHeight = header.clientHeight + 20;
        sidebarNavPanels.forEach(function(sidebarNavPanel) {
            sidebarNavPanel.style.paddingTop = headerHeight + "px";
        });
        mobileMenuOverlay.style.marginTop = headerHeight - 20 + "px";
    }

    function resetPadding() {
        sidebarNavPanels.forEach(function(sidebarNavPanel) {
            sidebarNavPanel.style.paddingTop = null;
        });
    }

    function checkScreenSize() {
        if (mq.matches) {
            updateSidebarPadding();
        } else {
            resetPadding()
        }
    }
    if (calcHeaderHeight) {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
    }
    var elements = document.querySelectorAll('.dwc-main');
    elements.forEach(function(element) {
        element.id = 'dwc-main';
    });
    var elements = document.querySelectorAll('.dwc-footer');
    elements.forEach(function(element) {
       element.id = 'dwc-footer';
    });
});
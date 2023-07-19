require('dotenv/config');
const { Telegraf } = require('telegraf')
import { DefaultCtx, GenericMenu, KeyboardButton, MenuFilters } from 'telegraf-menu';

const bot = new Telegraf(process.env.TOKEN);

const session = new LocalSession({ database: 'local.db.json' });

bot.use(session.middleware());

/**
 * Required callback parser
 * */
bot.use(GenericMenu.middleware());

type CurrentCtx = DefaultCtx & {
    i18n: I18nContext;
    session: {
        videoFilters: {
            from: string;
            to: string;
        },
        language: LanguageType,
        basket: Basket;
        keyboardMenu: GenericMenu,
    },
};


enum MenuAction {
    BASKET = 'basket',
    VIDEO_FILTERS = 'video_filters',
    LANGUAGE = 'language',
    START = 'start',
}

const START_MENU_FILTERS: MenuFilters<MenuAction> = [
    new KeyboardButton('menu.start.button.basket', MenuAction.BASKET),
    new KeyboardButton('menu.start.button.videoFilters', MenuAction.VIDEO_FILTERS),
    new KeyboardButton('menu.start.button.language', MenuAction.LANGUAGE),
];

const initStartMenu = (ctx: CurrentCtx) => {
    new RegularMenu<CurrentCtx, MenuAction>(
        {
            action: MenuAction.START,
            message: 'menu.start.start',
            filters: START_MENU_FILTERS,
            replaceable: true,
            debug: true,
            menuGetter: (menuCtx) => menuCtx.session.keyboardMenu,
            menuSetter: (menuCtx, menu) => menuCtx.session.keyboardMenu = menu,
            onChange(changeCtx, state) {
                switch (state) {
                    case MenuAction.BASKET:
                        // return initBasketMenu(changeCtx);

                    case MenuAction.LANGUAGE:
                        // return initLanguageMenu(changeCtx);

                    case MenuAction.VIDEO_FILTERS:
                        // return initVideoFiltersMenu(changeCtx);
                }
            },
        },
    ).sendMenu(ctx);
};


/**
 * Menu example
 * */
bot.command(MenuAction.START, initStartMenu);
bot.action(new RegExp(MenuAction.START), GenericMenu.onAction(
    (ctx: CurrentCtx) => ctx.session.keyboardMenu,
    initStartMenu,
));

compras = await prisma.compra.findMany({
    where: {
        idusuario: req.user.idusuario,
        status: 'A'
    }, select: {
        idcompra: true,
        idusuario: true,
        include: { usuario: true },
        usuario: {
            select: {
                idusuario: true,
                nome: true,
                email: true,
            }
        },
        departamento: {
            select: {
                iddepartamento: true,
                nome: true,
                centrocusto: true,
            }
        },
        createdAt: true,
        status: true,
        Itcompra: {
            select: {
                iditcompra: true,
                statuscompra: true,
                posicao: {
                    select: {
                        statuscompra: true,
                        nome: true
                    }
                },
                idunidade: true,
                unidade: {
                    select: {
                        idunidade: true,
                        nome: true
                    }
                },
                quantidade: true,
                nome: true

            }
        }

    }
})
import { IGame } from 'src/interfaces/game.interface';
import { ICart } from 'src/interfaces/cart-item.interface';
import { ILibraryItem } from 'src/interfaces/library-item.interface';
import { ICatalogItem } from 'src/interfaces/catalog-item.interface';

export function buildCatalogItems(
    games: IGame[],
    cart: ICart | null,
    libraryItems: ILibraryItem[]
): ICatalogItem[] {
    return games.map((game: IGame) => ({
        game,
        isInLibrary: libraryItems.some((libItem) => libItem.game.id === game.id),
        isInCart: cart?.items.some((cartItem) => cartItem.game.id === game.id) ?? false,
    }));
}
import { ICart } from "src/interfaces/cart-item.interface";
import { IContent } from "src/interfaces/featured-content.interface";
import { ILibraryItem } from "src/interfaces/library-item.interface";

export function isFeaturedContentDisabled(content: IContent | null, libraryItems: ILibraryItem[], cart: ICart | null, pendingCartItems: Set<string>) {
    const featuredGameId = content?.featuredGame?.id;
    if (!featuredGameId) return true;
    const inLibrary = libraryItems.some(item => item.game.id === featuredGameId);
    const inCart = cart?.items.some(item => item.game.id === featuredGameId) ?? false;
    const isPEnding = pendingCartItems.has(featuredGameId)
    return inLibrary || inCart || isPEnding;
}
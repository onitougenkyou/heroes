import { Monney } from './monney';
import { Defense } from './defense';
import { Weapon } from './weapon';
import { Sell } from './sell';

export class Inventaire {
  weapon: Weapon;
  armor: Defense;
  monney: Monney;
  sell: Array<Sell>;

  constructor(weaponC: Weapon, armorC: Defense, monneyC: Monney, sellC: Array<Sell>) {
    this.weapon = weaponC;
    this.armor = armorC;
    this.monney = monneyC;
    this.sell = sellC;
  }
}

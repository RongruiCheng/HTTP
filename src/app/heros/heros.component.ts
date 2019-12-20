import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HerosService } from './heros.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heroes: Hero[];
  // 当前编辑的英雄项
  editHero: Hero;
  constructor(private hs: HerosService) { }

  ngOnInit() {
    this.getHeros();
  }
  edit(hero: Hero): void {
    this.editHero = hero;
  }

  // get heroes from server
  getHeros(): void {
    this.hs.getHeroes().subscribe( heroes => this.heroes = heroes );
  }
  // add hero
  addHero(name: string): void {
    name = name.trim();
    if (!name) { return; }
    // 类型断言---用户输入的是字符串,没有id
    // 这里希望传给后台的是Hero接口类型,返回的也是Hero接口类型并带有id(这里后台会自动产生id)
    const newHero: Hero = { name } as Hero;
    this.hs.addHero(newHero).subscribe(hero => {
      // 更新视图
      this.heroes.push(hero);
    });
  }
  // delete hero
  // ①传id, 从后台删除后,重行拉取请求(对网速差的用户不友好)
  // ②传hero, 先改变视图,再删除
  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter( h => h !== hero);
    // 调用 subscribe() 方法会执行这个可观察对象，这时才会真的发起 DELETE 请求
    this.hs.deleteHero(hero.id).subscribe();
    // this.getHeros();
  }

  // update hero
  updateHero(): void {
    // 判断当前编辑的英雄是否为空或undefined
    if (this.editHero) {
      this.hs.updateHero(this.editHero).subscribe(hero => {

        // const idx = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
        // if ( idx > -1 ) { this.heroes[idx] = hero; }

        if ( hero ) { this.heroes.map(h => h.id === hero.id ? h = hero : h); }
      });
      this.editHero = undefined;
    }
  }

  // search hero
  search(heroName: string): void {
      if (heroName) {
        this.hs.searchHero(heroName).subscribe(heroes => this.heroes = heroes);
      }
  }
}

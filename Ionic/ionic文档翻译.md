Ionic API

## MenuToggle指令

[menuToggle]

meuToggle指令可以放在任何的按钮中，来控制菜单的开关。如果该指令被放在页面的NavBar中，只有这个页面为当前的根页面时，该按钮才能出现。更多信息查看[Menu Navigation Bar Behavior](https://ionicframework.com/docs/api/components/menu/Menu#navigation-bar-behavior)

### 用法

可以使用以下方法来添加简单的menuToogle按钮

```html
<button ion-button menuToggle>Toggle Menu</button>
```

要通过id或者side来切换指定的菜单，可以为menuToggle指令设置相应的值

```html
<button ion-button menuToggle="right">Toggle Right Menu</button>
```

如果把menuToggle指令放在navbar或者toolbar中，必须是ion-navbar或者ion-toolbar的子元素，而且不能放在ion-buttons元素中

```html
<ion-header>
  <ion-navbar>
    <ion-buttons start>
      <button ion-button>
        <ion-icon name="contact"></ion-icon>
      </button>
    </ion-buttons>
    <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>
      Title
    </ion-title>
    <ion-buttons end>
      <button ion-button (click)="doClick()">
        <ion-icon name="more"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>
```

同ion-buttons元素类似，menuToggle指令可以通过start、end、left、right来定位

```html
<ion-toolbar>
  <button ion-button menuToggle right>
    <ion-icon name="menu"></ion-icon>
  </button>
  <ion-title>
    Title
  </ion-title>
  <ion-buttons end>
    <button ion-button (click)="doClick()">
      <ion-icon name="more"></ion-icon>
    </button>
  </ion-buttons>
</ion-toolbar>
```

### 实例成员

ngAfterContentInit()

### Sass Variables(具体查看文档)

#### ALL

| 属性              | 默认值           | 描述                          |
| ----------------- | ---------------- | ----------------------------- |
| $menu-width       | 304px            | 菜单宽度                      |
| $menu-small-width | $menu-width-40px | 在小设备的菜单宽度(小于340px) |

### 相关文档

[Menu Component Docs](https://ionicframework.com/docs/components#menus), [Menu API Docs](
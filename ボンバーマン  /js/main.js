"use strict"
//変数関係=============================================================================================

//const----------------------------------------------------------------------------------------------
const   BOMBHEIGHT             = 32;                        //プレイヤーの高さ
const   BOMBWIDTH              = 32;                        //プレイヤーの幅
const   CHRHEIGHT              = 32;                        //プレイヤーの高さ
const   CHRWIDTH               = 32;                        //プレイヤーの幅
const   FONT                   = "20px monospace";          //使用フォント;
const   FONTSTYLE              = "#FFFFFF";                 //フォント色(座標確認用);
const   gKey                   = new Uint8Array(0x100);     //キー入力バッファ
const   GAME_HEIGHT            = 19;                        //ゲームステージ枠ブロック高さ
const   GAME_WIDTH             = 19; 　　　　     　　        //ゲームステージ枠ブロック幅

const   gFileBlock             = "png/hard_block.png";      //ステージ枠ブロックのリンク
const   gFileBlock2            = "png/hard_block2.png";     //ステージ内ブロックのリンク
const   gFileGrassBlock        = "png/grass.png";           //ステージ内雑草ブロックのリンク
const   gFilePlayer            = "png/player1.png";         //プレイヤー１のリンク
const   gFilePlayerDeath       = "png/Player1death.png";    //プレイヤー１のリンク
const   gFileSoftBlock         = "png/soft_block.png";      //ソフトブロックのリンク
const   gFileBomb              = "png/bomb.png";            //爆弾のリンク
const   gFileItem              = "png/item.png";            //アイテムのリンク
const   gFileWarp              = "png/warp.png";            //ワープのリンク
const   gFileEnemy             = "png/enemy1.png";          //敵１のリンク

const   HEIGHT                 = 610;                       //仮想画面の高さ
const   PlayerHEIGHT           = 32;                        //プレイヤータイルサイズ縦
const   PlayerWIDTH            = 32;                        //プレイヤータイルサイズ横
const   SMOOTH                 = 0;                         //保管処理1
const   TILESIZE               = 32;                        //タイルサイズ(ドット)
const   WIDTH                  = 620;                       //仮想画面の幅
const   WNDSTYLE               =  " rgba( 0, 0, 0 , 0.75)"  // ウィンドの色(座標確認用)


//let-------------------------------------------------------------------------------------------------
let     arrbomb                = [];                        //爆弾の空配列
let     arritem                = [];                        //アイテム空配列
let     arrhardBlockUpDown     = [];                        //ハードブロック空配列
let     arrhardBlockLeftRight  = [];                        //ハードブロック空配列
let     arrhardBlock2random    = [];                        //ハードブロック2空配列
let     arrSoftBlock           = [];                        //ソフトブロック空配列
let     arrwarp                = [];                        //ワープ

let     bomb_px;                                            //爆弾ピクセル座標X
let     bomb_py;                                            //爆弾ピクセル座標Y
let     firepower              = 2;                         //爆弾の初期火力
let     gAngle                 = 0;                         //プレイヤーの向き
let     dAngle                 = 0;                         //プレイヤーの死亡アクション
let     gBombExplosiontimer    = 0;                         //爆発カウンタ
let     gItemsFrame            = 0;                         //アイテムカウンタ
let     gFireFrame             = 0;                         //爆発カウンタ
let     gBombFrame             = 0;                         //爆弾カウンタ
let     gFrame                 = 0;                         //内部カウンタ
let     gTime                  = 0;                         //ゲームカウンタ
let     gHeight;                                            //実画面の高さ
let     gImgGrassBlock;                                     //芝生
let     gImgHardBlock;                                      //ハードブロック
let     gImgHardBlock2;                                     //ハードブロック2
let     gImgMap;                                            //画像マップ
let     gImgPlayer;                                         //プレイヤー
let     gImgPlayerDeath;                                    //プレイヤー死亡
let     gImgBomb;                                           //爆弾
let     gImgItem;                                           //アイテム
let     gImgWarp;                                           //ワープ
let     gImgEnemy;                                          //敵
let     gImgSoftBlock;                                      //ソフトブロック
let     gMoveX                 = 0;                         //移動量X 
let     gMoveY                 = 0;                         //移動量Y 
let     gPlayerSpeedX          = 14;                        //14がベスト
let     gPlayerX               = 35;                        //プレイヤーX軸
let     gPlayerY               = 30;                        //プレイヤーY軸
let     gScreen;                                            //仮想画面
let     gWidth;                                             //実画面の幅
let     push                   =  0;                        //ワープで押している時の加算地
let     pushTime               = 60;                        //ワープするまでの時間
let     sec                    = 900;                       //タイマー時間
let     x;                                                  //for文用のX
let     y;                                                  //for文用のY

let     timer                  = NaN;                       //33ms秒のタイマー
let     BombTimer              = NaN;                       //爆弾タイマー用変数
let     BlockEraseTime         = NaN;                       //ブロック消去用変数

let     bomb_boolen            = new Boolean();　　　　　　　　//爆弾の有無判断
let     burn_boolen            = new Boolean();             //炎の有無判断
let     move_boolen            = new Boolean();　　　　　　　　//プレイヤーの動きの判断
let     death_boolen           = new Boolean();　　　　　　　　//プレイヤーが生きているかの判断
let     items_boolen           = new Boolean();　　　　　　　　//アイテムの判断


//======敵用================
let     deathEnemy_boolen      = new Boolean();　　　　　　　　//敵が生きているかの判断
let     enemy_mx;
let     enemy_my;
let     new_pointX;
let     new_pointY;
let     random_sumX; 
let     random_sumY; 



//==ビットマップ関係=====================================================================================
function LoadImage()
{
    gImgHardBlock   = new Image(); gImgHardBlock.src   = gFileBlock;     　//ハードブロックマップ呼び込み
    gImgHardBlock2  = new Image(); gImgHardBlock2.src  = gFileBlock2;    　//ハードブロック2マップ呼び込み
    gImgSoftBlock   = new Image(); gImgSoftBlock.src   = gFileSoftBlock;   //ソフトブロックマップ呼び込み
    gImgGrassBlock  = new Image(); gImgGrassBlock.src  = gFileGrassBlock;  //芝生マップ呼び込み
    gImgPlayer      = new Image(); gImgPlayer.src      = gFilePlayer;      //プレイヤー呼び込み
    gImgPlayerDeath = new Image(); gImgPlayerDeath.src = gFilePlayerDeath; //プレイヤー死亡の呼び込み
    gImgBomb        = new Image(); gImgBomb.src        = gFileBomb;        //爆弾呼び込み
    gImgItem        = new Image(); gImgItem.src        = gFileItem;        //アイテムの呼び込み
    gImgWarp        = new Image(); gImgWarp.src        = gFileWarp;        //ワープの呼び込み
    gImgEnemy       = new Image(); gImgEnemy.src        = gFileEnemy;      //敵の呼び込み
}



// //==Pointオブジェクト==========================================================================
// function Point(x, y) {
//   this.x = x;
//   this.y = y;
// }



//==描画関係==============================================================================================
function DrawMain()
{
    const  g  = gScreen.getContext("2d");                          //仮想画面の2D描画テキストを取得
    
    //表示--------------------------------------------------------------------------------------
    for ( y = 1; y < GAME_HEIGHT - 1; y++ ) {
      for (  x = 1; x < GAME_WIDTH - 1; x++ ) {

        　gItemsFrame++;

          NoSoftBlockArea();                                       //ソフトブロックを消去する関数

          if((arrSoftBlock[y][x] == 0) && (arritem[y][x] == 0)){
            warpImg();                                             //ワープの表示
          }
          
          speedItemImg(y,x);                                       //スピードアイテムの表示
          fireItemImg(y,x);                                        //炎アイテムの表示
          softBlockImg(y,x);                                       //ソフトブロックの表示 
      }
    }

    hardBlock2Img(y,x);                                            //ハードブロック2の表示 
    hardBlockImg(y,x);                                             //ハードブロックの表示
     
    //プレイヤー------------------------------------------------------------------------------------------
    let px = gPlayerX;
    let py = gPlayerY;

    if ( death_boolen == false) {
        g.drawImage ( gImgPlayer,
          　　　　　　( gFrame >> 3 & 7) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
          　　　　　　                           px,                 py, CHRWIDTH, CHRHEIGHT );
    } else {
        g.drawImage ( gImgPlayerDeath,
          　　　　　　( gFrame >> 6 & 7) * CHRWIDTH, dAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
          　　　　　　                           px,                 py, CHRWIDTH, CHRHEIGHT );
        gFrame++;
    }

    let mx = Math.floor(gPlayerX / TILESIZE) ;                     //　プレイヤーのタイル座標X
    let my = Math.round(gPlayerY / TILESIZE) ;                     //　プレイヤーのタイル座標Y

    bombImg(my,mx);
    

    //敵------------------------------------------------------------------------------------------
    // if ( deathEnemy_boolen == false) {
      //   // enemy_move(random_sumY,random_sumX);
      //   enemy_move(new_pointX,new_pointY);
      //   g.drawImage ( gImgEnemy,
      //     　　　　　　( gFrame >> 6 & 7) * CHRWIDTH, 0 * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
      //     　　　　　　 new_pointX, new_pointY , CHRWIDTH, CHRHEIGHT );
      // }
      
    
    //位置の詳細表示------------------------------------------------------------------------------------
    // g.fillStyle = WNDSTYLE;
    // g.fillRect(0, 610, WIDTH, 50);
    // g.font      = FONT;
    // g.fillStyle = FONTSTYLE;
    // g.fillText("[ X(mx) = " + mx + " Y(my) = " + my + "]  [" +" px(gPlayerX) = " + gPlayerX + " py(gPlayerY) = " + gPlayerY + " ]", 0,20);


    //爆発モーション--------------------------------------------------------------------------------------
    if ((burn_boolen == true) && (gBombExplosiontimer == 0)){ 
    
        let bomb_mx = Math.floor(bomb_px / TILESIZE) ;
        let bomb_my = Math.round(bomb_py / TILESIZE) ;
        
        //炎真ん中--------------------------------------------------------
        g.drawImage ( gImgBomb,
          　　　     ( gFireFrame >> 2 & 7) * BOMBWIDTH, 1 * BOMBHEIGHT, BOMBWIDTH, BOMBHEIGHT,
          　　　　　　  bomb_px,bomb_py, BOMBWIDTH, BOMBHEIGHT );
         
        
        //炎左--------------------------------------------------------
        if((bomb_mx != 1) && ((bomb_my % 2) == 1)){
            for (x = 0 ; x < firepower; x++){
                if((bomb_mx - x) > 0){
                  g.drawImage ( gImgBomb,
                    　　　　　　( gFireFrame >> 2 & 7) * BOMBWIDTH, 3 * BOMBHEIGHT, BOMBWIDTH, BOMBHEIGHT,
                    　　　　　　 bomb_px - BOMBWIDTH * x, bomb_py, BOMBWIDTH, BOMBHEIGHT );
                }
            }
        }


        //炎右--------------------------------------------------------
        if((bomb_mx != 17) && ((bomb_my % 2) == 1)){ 
            for (x = 0 ; x < firepower; x++){
                if((bomb_mx + x) < 18){
                  g.drawImage ( gImgBomb,
                    　　　　　　( gFireFrame >> 2 & 7) * BOMBWIDTH, 3 * BOMBHEIGHT, BOMBWIDTH, BOMBHEIGHT,
                    　　　　　　  bomb_px + BOMBWIDTH * x, bomb_py, BOMBWIDTH, BOMBHEIGHT );
                }
            }
        }

        
        //炎上--------------------------------------------------------
        if((bomb_my != 1) && ((bomb_mx % 2) == 1)){ 
            for (x = 0 ; x < firepower; x++){
                if((bomb_my - x) > 0){
                  g.drawImage ( gImgBomb,
                    　　　　　　( gFireFrame >> 2 & 7) * BOMBWIDTH, 2 * BOMBHEIGHT, BOMBWIDTH, BOMBHEIGHT,
                    　　　　　　  bomb_px, bomb_py - BOMBHEIGHT * x, BOMBWIDTH, BOMBHEIGHT );
                }
            }
        }


        //炎下--------------------------------------------------------
        if((bomb_my != 17) && ((bomb_mx % 2) == 1)) { 
            for (x = 0 ; x < firepower; x++){
                if((bomb_my + x) < 18){
                  g.drawImage ( gImgBomb,
                　    　　　　　( gFireFrame >> 2 & 7) * BOMBWIDTH, 2 * BOMBHEIGHT, BOMBWIDTH, BOMBHEIGHT,
                　　     　　　　 bomb_px, bomb_py + BOMBHEIGHT * x, BOMBWIDTH, BOMBHEIGHT );
                }
            }
        }

        gFireFrame++;
    }
}



//芝生枠---------------------------------------------------------------------------------------------
function grassImg()
{
    const  g  = gScreen.getContext("2d");
    for ( let y = 1; y < GAME_HEIGHT - 1; y++ ) {
        for ( let x = 1; x < GAME_WIDTH - 1; x++ ){
            g.drawImage ( gImgGrassBlock, 0, 0, TILESIZE, TILESIZE,
                          x * TILESIZE, y * TILESIZE, TILESIZE ,TILESIZE);
        }
    }
}



//ランダムソフトブロック---------------------------------------------------------------------------
function softBlockImg(y,x)
{
    const  g  = gScreen.getContext("2d");
    if(arrSoftBlock[y][x] == 1){
      g.drawImage ( gImgSoftBlock, 0, 0, TILESIZE, TILESIZE,
                    x * TILESIZE, y * TILESIZE, TILESIZE ,TILESIZE);
    } 
}



//ハードブロック枠--------------------------------------------------------------------------------------
function hardBlockImg(y,x)
{
    const  g  = gScreen.getContext("2d");
    for (  y = 0; y < GAME_HEIGHT; y++ ) {
        for (  x = 0; x < GAME_WIDTH; x++ ) {
            if(( arrhardBlockUpDown[y][x] + arrhardBlockLeftRight[y][x] > 0 )) {

                g.drawImage ( gImgHardBlock, 0, 0, TILESIZE, TILESIZE,
                              x * TILESIZE, y * TILESIZE, TILESIZE ,TILESIZE);
            }
        }
    }
}



//敵--------------------------------------------------------------------------------------
// function enemy_move(new_pointX,new_pointY)
// {
//      setInterval(function () { 
//       random_sumX = 0;
//       random_sumY = 0;
      
//       random_sumX = random_sumX + ((Math.floor(Math.random() * 4)) * TILESIZE);
//       random_sumY = random_sumY + ((Math.floor(Math.random() * 4)) * TILESIZE);

//       new_pointX = (9 * TILESIZE) + random_sumX;
//       new_pointY = (9 * TILESIZE) + random_sumY;
//      },100);
// }



//ハードブロック2枠--------------------------------------------------------------------------------------
function hardBlock2Img(y,x)
{    
    const  g  = gScreen.getContext("2d");             //仮想画面の2D描画テキストを取得
    for (  y = 0; y < GAME_HEIGHT; y++ ) {
        for (  x = 0; x < GAME_WIDTH; x++ ) {
            if ( arrhardBlock2random[y][x] == 1 ){
              g.drawImage ( gImgHardBlock2, 0, 0, TILESIZE, TILESIZE,
                            x * TILESIZE, y * TILESIZE, TILESIZE ,TILESIZE);
            }
        }
    }
}



//爆弾---------------------------------------------------------------------------------------------
function bombImg(my,mx)
{   
    const  g  = gScreen.getContext("2d");             //仮想画面の2D描画テキストを取得
    if ((bomb_boolen == true)){ 
    g.drawImage ( gImgBomb,
      　　　　　　( gBombFrame >> 2 & 7) * BOMBWIDTH, 0 * BOMBHEIGHT, BOMBWIDTH, BOMBHEIGHT,
      　　　　　　  bomb_px, bomb_py, BOMBWIDTH, BOMBHEIGHT );
        gBombExplosiontimer += 4;
        if(gBombExplosiontimer < 7){
            BlockEraseTimer(my,mx);
        }
    }
}



// アイテム(加速)--------------------------------------------------------------------------------
function speedItemImg(y,x)
{
    const  g  = gScreen.getContext("2d");
    if(arritem[y][x] == 1){
      g.drawImage ( gImgItem, ( gItemsFrame >> 2 & 1) * CHRWIDTH, 0 * CHRHEIGHT, TILESIZE, TILESIZE,
                    x * TILESIZE, y * TILESIZE, TILESIZE ,TILESIZE);
    }
}



// アイテム(火力)--------------------------------------------------------------------------------
function fireItemImg(y,x)
{
    const  g  = gScreen.getContext("2d");
    if(arritem[y][x] == 2){
      g.drawImage ( gImgItem, ( gItemsFrame >> 2 & 1) * CHRWIDTH, 1 * CHRHEIGHT, TILESIZE, TILESIZE,
                    x * TILESIZE, y * TILESIZE, TILESIZE ,TILESIZE);
    }
}



//ワープ描画に関して--------------------------------------------------------------------------------------
function warpImg()
{

  const  g  = gScreen.getContext("2d");             //仮想画面の2D描画テキストを取得

  //[ワープ左上]-----------------------------------------------------------------------
  if(arrSoftBlock[3][3] == 0){
    g.drawImage ( gImgWarp, ( gItemsFrame >> 2 & 1) * CHRWIDTH, 0 * CHRHEIGHT, TILESIZE, TILESIZE,
                  3 * TILESIZE, 3 * TILESIZE, TILESIZE ,TILESIZE);
  }

  //[ワープ右上]-----------------------------------------------------------------------
  if(arrSoftBlock[3][15] == 0){
    g.drawImage ( gImgWarp, ( gItemsFrame >> 2 & 1) * CHRWIDTH, 0 * CHRHEIGHT, TILESIZE, TILESIZE,
                  3 * TILESIZE, 15 * TILESIZE, TILESIZE ,TILESIZE);
  }
 
  //[ワープ左下]-----------------------------------------------------------------------
  if(arrSoftBlock[15][3] == 0){
    g.drawImage ( gImgWarp, ( gItemsFrame >> 2 & 1) * CHRWIDTH, 0 * CHRHEIGHT, TILESIZE, TILESIZE,
                  15 * TILESIZE, 3 * TILESIZE, TILESIZE ,TILESIZE);
  }
  
　//[ワープ左下]-----------------------------------------------------------------------
  if(arrSoftBlock[15][15] == 0){
    g.drawImage ( gImgWarp, ( gItemsFrame >> 2 & 1) * CHRWIDTH, 0 * CHRHEIGHT, TILESIZE, TILESIZE,
                  15 * TILESIZE, 15 * TILESIZE, TILESIZE ,TILESIZE);
  }
}



//==ソフトブロック禁止エリア==============================================================================
function NoSoftBlockArea()
{

    //プレイヤー1エリア--------------------
    arrSoftBlock[1][1]   = 0;
         arritem[1][1]   = 0;

    arrSoftBlock[1][2]   = 0;
         arritem[1][2]   = 0;

    arrSoftBlock[2][1]   = 0;
         arritem[2][1]   = 0;

  　//プレイヤー2エリア--------------------
    arrSoftBlock[17][17] = 0;
         arritem[17][17] = 0;

    arrSoftBlock[17][16] = 0;
         arritem[17][16] = 0;

    arrSoftBlock[16][17] = 0;
         arritem[16][17] = 0;

    //ブロック禁止エリア--------------------
    arrSoftBlock[3][3]   = 0;
         arritem[3][3]   = 0;
         arrwarp[3][3]   = 1; //左上のワープ

    arrSoftBlock[3][15]  = 0;
         arritem[3][15]  = 0;
         arrwarp[3][15]  = 1; //右上のワープ

    arrSoftBlock[15][3]  = 0;
         arritem[15][3]  = 0;
         arrwarp[15][3]  = 1; //左下のワープ

    arrSoftBlock[15][15] = 0;
         arritem[15][15] = 0;
         arrwarp[15][15] = 1; //右下のワープ

      arrSoftBlock[9][9] = 0;
           arritem[9][9] = 0;
           arrwarp[9][9] = 1;
}



//==進行処理===========================================================================================
function TickField()
{
    let px = gPlayerX;
    let py = gPlayerY;

    let bomb_mx = Math.floor(px / TILESIZE) ;
    let bomb_my = Math.round(py / TILESIZE) ;

    warpLoad();
    
    if      (gMoveX != 0 || gMoveY != 0) { }                                 //移動中の場合
    else if (gKey[37]) { gAngle = 1; gMoveX = -TILESIZE;}                    //左
    else if (gKey[38]) { gAngle = 3; gMoveY = -TILESIZE;}                    //上
    else if (gKey[39]) { gAngle = 2; gMoveX =  TILESIZE;}                    //右
    else if (gKey[40]) { gAngle = 0; gMoveY =  TILESIZE;}                    //下   
    else if (gKey[87]) { Bombpush(bomb_my,bomb_mx);
                         if((bomb_boolen == false)&&(burn_boolen == false)){
                             bomb_boolen   = true;                           //W 爆弾を置く
                             bomb_px       = px; 
                             bomb_py       = py;
                             bomb_put_sound();}}

                          
    //　移動後のタイル座標判定-------------------------------------------------------------
    let mx_n = Math.floor((gPlayerX + gMoveX) / TILESIZE);                   //　プレイヤー次のタイル座標X
    let my_n = Math.round((gPlayerY + gMoveY) / TILESIZE);                   //　プレイヤー次のタイル座標Y

    let mx   = Math.floor((gPlayerX) / TILESIZE);                            //　プレイヤーのタイル座標X
    let my   = Math.round((gPlayerY) / TILESIZE);                            //　プレイヤーのタイル座標Y

    let m1   = arrhardBlock2random[my_n][mx_n];
    let m2   = arrhardBlockLeftRight[my_n][mx_n];
    let m3   = arrhardBlockUpDown[my_n][mx_n];
    let m4   = arrSoftBlock[my_n][mx_n];
    let m5   = arritem[my][mx];
    let m6   = arrwarp[my][mx];
    let m7   = arrbomb[my_n][mx_n];             

    
    //Aを押している時の動作---------------------------------------------------------------
    if(m6 == 1){
        if (gKey[65]) {
            push++;
        
            if(push > pushTime){
                let warp_random = (Math.floor(Math.random() * 4));           //ランダムの数字でワープする
                
                //case0左上　case1左下　case2右上　case3右下

                //同じ所にワープをしない処理
                if((mx == 3) && (my == 3) && (warp_random != 0)){
                    warp_sound();
                    switch (warp_random){
                        case 1:
                            gPlayerX  =  3 * TILESIZE;
                            gPlayerY  = 15 * TILESIZE;
                            push      =  0;
                            break;
                        case 2:
                            gPlayerX  = 15 * TILESIZE;
                            gPlayerY  =  3 * TILESIZE;
                            push      =  0;
                            break;
                        case 3:
                            gPlayerX  = 15 * TILESIZE;
                            gPlayerY  = 15 * TILESIZE;
                            push      =  0;
                            break;
                    }
                }else if(((mx == 3) && (my == 15) && (warp_random != 1))){
                    warp_sound();
                    switch (warp_random){
                      case 0:
                          gPlayerX  =  3 * TILESIZE;
                          gPlayerY  =  3 * TILESIZE;
                          push      =  0;
                          break;
                      case 2:
                          gPlayerX  = 15 * TILESIZE;
                          gPlayerY  =  3 * TILESIZE;
                          push      =  0;
                          break;
                      case 3:
                          gPlayerX  = 15 * TILESIZE;
                          gPlayerY  = 15 * TILESIZE;
                          push      =  0;
                          break;
                    }
                }else if(((mx == 15) && (my == 3) && (warp_random != 2))){
                    warp_sound();
                    switch (warp_random){
                      case 0:
                          gPlayerX  =  3 * TILESIZE;
                          gPlayerY  =  3 * TILESIZE;
                          push      =  0;
                          break;
                      case 1:
                          gPlayerX  =  3 * TILESIZE;
                          gPlayerY  = 15 * TILESIZE;
                          push      =  0;
                          break;
                      case 3:
                          gPlayerX  = 15 * TILESIZE;
                          gPlayerY  = 15 * TILESIZE;
                          push      =  0;
                          break;
                    }
                }else if(((mx == 15) && (my == 15) && (warp_random != 3))){
                    warp_sound();
                    switch (warp_random){
                      case 0:
                          gPlayerX  =  3 * TILESIZE;
                          gPlayerY  =  3 * TILESIZE;
                          push      =  0;
                          break;
                      case 1:
                          gPlayerX  =  3 * TILESIZE;
                          gPlayerY  = 15 * TILESIZE;
                          push      =  0;
                          break;
                      case 2:
                          gPlayerX  = 15 * TILESIZE;
                          gPlayerY  =  3 * TILESIZE;
                          push      =  0;
                          break;
                    }
                }
            }
        }  
    }

    //スピードアップに関して--------------------------------------------------------
    if(m5 == 1){
        arritem[my][mx]   = 0;
        gPlayerSpeedX    -= 4;
        item_get_sound();
        console.log("gPlayerSpeedX:" + gPlayerSpeedX);
    }

    //火力アップに関して-----------------------------------------------------------
    if(m5 == 2){
        arritem[my][mx]   = 0;
        firepower++;
        item_get_sound();
        console.log("firepower:" + firepower);
    }

    //壁がある時に動作をさせない設定-------------------------------------------------
    if((m1 == 1) || (m2 == 1) || (m3 == 1) || (m4 == 1) || (m7 == 1)) {
        gMoveX = 0;
        gMoveY = 0;
    }


    gPlayerX += Math.sign(gMoveX);      //サイン関数は、値が＋の時は１　値がーの時は−１
    gPlayerY += Math.sign(gMoveY);
    gMoveX   -= Math.sign(gMoveX);      //移動量消費X
    gMoveY   -= Math.sign(gMoveY);    
}



//==ソフトブロックロード===================================================================================
function softBlockLoad()
{
  for ( y = 0; y < GAME_HEIGHT ; y++) {
    arrSoftBlock[y] = [];
    arritem[y]      = [];
    for ( x = 0; x < GAME_WIDTH ; x++) {
        if((Math.floor(Math.random() * 2 ) % 2 == 1) || ((x % 2 == 0) && (y % 2 == 0))){
            arrSoftBlock[y][x] =  1;
            if((Math.floor(Math.random() * 10 ) == 1) && (x % 2 == 1) && (y % 2 == 1) && (x > 0) && (x < GAME_HEIGHT-1) && (y > 0) && (y < GAME_WIDTH-1)){
                arritem[y][x]  = 1;
            }else if((Math.floor(Math.random() * 5 ) == 2) && (x % 2 == 1) && (y % 2 == 1) && (x > 0) && (x < GAME_HEIGHT-1) && (y > 0) && (y < GAME_WIDTH-1))
                {
                  arritem[y][x]  = 2;
                }
      }else{
         arrSoftBlock[y][x]    = 0;
              arritem[y][x]    = 0;
      }
    }
  }
}



//==ワープ=============================================================================================
function warpLoad()
{
  for ( y = 0; y < GAME_HEIGHT ; y++) {
      arrwarp[y] = [];
      for ( x = 0; x < GAME_WIDTH ; x++) {
          if(((x ==  3) && (y ==  3)) ||
             ((x == 15) && (y ==  3)) ||
             ((x ==  3) && (y == 15)) ||
             ((x == 15) && (y == 15))){
            arrwarp[y][x] = 1;
          }else{
            arrwarp[y][x] = 0;
          }
      }
   }
}



//==爆弾ロード=============================================================================================
function BombLoad()
{
    for ( y = 0; y < GAME_HEIGHT ; y++) {
        arrbomb[y] = [];
        for ( x = 0; x < GAME_WIDTH ; x++) {
              arrbomb[y][x] = 0;
        }
    }
}



//==爆弾プッシュ=============================================================================================
function Bombpush(bomb_my,bomb_mx){
  if(bomb_boolen == true){
        arrbomb[bomb_my][bomb_mx] = 1;
    }else{
        BombLoad();                    //爆弾位置を初期化
    }
}



//==ハードブロックロード===================================================================================
function hardBlockLoad()
{
  

    //上下ブロック枠--------------------------------------------------------------------------------------
    for ( y = 0; y < GAME_HEIGHT ; y++) {
        arrhardBlockUpDown[y] = [];
        for ( x = 0; x < GAME_WIDTH ; x++ ) {
            if((( x < GAME_WIDTH ) && ( y == 0 ) ) || (( x < GAME_WIDTH ) && ( y == GAME_HEIGHT -1 ))){
              arrhardBlockUpDown[y][x] = 1;
            }else{
              arrhardBlockUpDown[y][x] = 0;
            }
        }
    }

    
    //左右ブロック枠--------------------------------------------------------------------------------------
    for ( y = 0; y < GAME_HEIGHT; y++ ) {
        arrhardBlockLeftRight[y] = [];
        for ( x = 0; x < GAME_WIDTH; x++ ) {
            if( ( ( x == 0 ) && ( y < GAME_HEIGHT ) ) || ( ( x == GAME_WIDTH -1) && ( y < GAME_HEIGHT ))) {
              arrhardBlockLeftRight[y][x] = 1;
            }else{
              arrhardBlockLeftRight[y][x] = 0;
            }
        }
    }
}



//==ハードブロック２ロード===================================================================================
function hardBlock2Load()
{
    for ( y = 0; y < GAME_HEIGHT ; y++) {
        arrhardBlock2random[y] = [];
        for ( x = 0; x < GAME_WIDTH ; x++ ) {
            if( ( x % 2 == 0 ) && ( y % 2 == 0 )){
              arrhardBlock2random[y][x] = 1;
            }else{
              arrhardBlock2random[y][x] = 0;
            }
        }
    }
}



//==ブロック消去=======================================================================================
function BlockErase(my,mx)
{ 
    explosion_sound();
    let bomb_mx = Math.floor(bomb_px / TILESIZE);
    let bomb_my = Math.round(bomb_py / TILESIZE);

    let now_mx = Math.floor((gPlayerX) / TILESIZE);
    let now_my = Math.round((gPlayerY) / TILESIZE);


    //炎左--------------------------------------------------------
    if((bomb_mx != 1) && ((bomb_my % 2) == 1)){ 
        for (x = 0 ; x < firepower; x++){
            if((bomb_mx - x) > 0){
              arrSoftBlock[my][mx-x] = 0;   //左のブロック消去
            }
        }
    }


    //炎右--------------------------------------------------------
    if((bomb_mx != 17) && ((bomb_my % 2) == 1)){ 
        for (x = 0 ; x < firepower; x++){
            if((bomb_mx + x) < 18){
              arrSoftBlock[my][mx+x] = 0;   //右のブロック消去
            }
        }
    }


    //炎上--------------------------------------------------------
    if((bomb_my != 1) && ((bomb_mx % 2) == 1)){ 
        for (x = 0 ; x < firepower; x++){
            if((bomb_my - x) > 0){
              arrSoftBlock[my-x][mx] = 0;   //上のブロック消去
            }
        }
    }


    //炎下--------------------------------------------------------
    if((bomb_my != 17) && ((bomb_mx % 2) == 1)) { 
        for (x = 0 ; x < firepower; x++){
            if((bomb_my + x) < 18){
              arrSoftBlock[my+x][mx] = 0;   //下のブロック消去
            }
        }
    }

    gBombExplosiontimer = 0;                //爆弾カウンタリセット
    gFireFrame = 0;                         //爆弾の動きをゼロにする
    bomb_boolen = false;
    burn_boolen = true;
    BombLoad();


    
    //firepower(火力分ループ処理)
    for( x = 0; x < firepower; x++){
        if((burn_boolen == true) && (((now_mx + now_my) % 2) == 0)){
            if(((now_mx  == bomb_mx - x ) && (now_my == bomb_my))       || //爆発エリア左とプレイヤー接触に
               ((now_mx  == bomb_mx + x ) && (now_my == bomb_my))       || //爆発エリア右とプレイヤー接触に
               ((now_mx  == bomb_mx)      && (now_my == bomb_my + x ))  || //爆発エリア下とプレイヤー接触に
               ((now_mx  == bomb_mx)      && (now_my == bomb_my - x )))    //爆発エリア上とプレイヤー接触に
              {
                gameover_sound();
                DeathTimer();
              }
        }
    }
  
    BurnTime();
  }


//==描画関係===========================================================================================
function WmPaint()
{
    DrawMain();
    
    const ca  = document.getElementById("main"); 　　　　　　　　　//mainキャンパス要素を取得
    const  g  = ca.getContext("2d");             　　　　　　　　　//2D描画テキストを取得 
    
    //仮想画面イメージを実画面に転送
    g.drawImage (gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight);
}



//==ブラウザサイズ変更==================================================================================
function WmSize()
{
    const ca  = document.getElementById("main"); 　　　　　　　　　　//mainキャンパス要素を取得
    ca.height = window.innerHeight;              　　　　　　　　　　//キャンパスの高さをブラウザの高さに変更
    ca.width  = window.innerWidth;               　　　　　　　　　　//キャンパスの幅をブラウザの幅に変更
    
    const g = ca.getContext('2d');
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH; //保管処理
    
    //実画面サイズを計算。ドットアスペクト比を維持したままでの最大サイズを計算-----------------------------------
    gHeight = ca.height
    gWidth  = ca.width
    
    if(gWidth / WIDTH < gHeight / HEIGHT){
      gHeight = gWidth * HEIGHT / WIDTH;
    }else{
      gWidth  = gHeight * WIDTH / HEIGHT;
    }
}



//==キー入力DOWNイベント==========================================================================
window.onkeydown = function (e)
{
    let c = e.keyCode;                              //キーコード取得
    move_boolen = true;
    
    gKey[c] = 1;
    
    //ボンバーマンが爆発に接触後にDeathTimer()発動
    if(death_boolen == false) {
        TickField();                                //　フィールド進行処理
    }else{
      gKey[e.keyCode] = 0;
    }
}



//==キー入力UPイベント============================================================================
window.onkeyup = function (e)
{
    gKey[e.keyCode] = 0;
    move_boolen = false;
    push = 0;
}



/*==================================================================================================
-----------------------------------------タイマーイベント----------------------------------------------
====================================================================================================*/

//==タイマーイベント====================================================================================
function WmTimer()
{
    clearInterval(timer);
    
    timer = setTimeout("WmTimer()", gPlayerSpeedX);
    
    if((move_boolen == true) || ((gMoveX + gMoveY) != 0)) {
      gFrame++;                                               //カーソルを押している時にプレイヤーが動く
    }
    
    TickField();
    WmPaint(); 
}



//==爆弾タイマ====================================================================================
function BombMoveTimer()
{
    BombTimer = setTimeout("BombMoveTimer()", 33);
    gBombFrame++;                                           //爆弾カウンタ加算
}



//==爆発の炎タイマ====================================================================================
function BurnTime()
{
    setTimeout(function () { burn_boolen = false; gFireFrame = 0}, 200);
}



//==ブロック消去タイマ====================================================================================
function BlockEraseTimer(my,mx)
{
    BlockEraseTime = setTimeout(function () { BlockErase(my,mx)}, 2000);
}


//==ゲームオーバータイム====================================================================================
function DeathTimer()
{
    setTimeout(function () {
      alert("ゲームーオーバー・・・再度ゲームをcontinueします！！"); 
            if(true){
              location.reload(); 
            }
        dAngle = 1;
    }, 3000);
  
    death_boolen = true;      　　　　　　　　　　　　  // プレイヤー表示が消えるスイッチ
}



//==カウントタイマ====================================================================================
function GameTimer(my,mx)
{
    gTime++;                                           //ゲームカウンタ加算
    let time    =  document.getElementById('time');
    let minutes =  Math.floor((sec - gTime) / 60);
    let seconds =  Math.floor((sec - gTime) % 60);
    
    if(gTime < sec) {
      time.innerHTML = minutes + " : " + seconds;
    }else{
      time.innerHTML = "時間切れ";
      setTimeout(function () { AlertTimer() }, 10000);
    }
}



//==アラートタイマ====================================================================================
function AlertTimer()
{
    alert("再ゲーム");
    gameover_sound();
    if(true){
      location.reload(true)
    }
}



/*==================================================================================================
-----------------------------------------起動時処理イベント--------------------------------------------
====================================================================================================*/

//==ブラウザ起動========================================================================================
window.onload = function()　
{
    LoadImage();                                                  //ビットマップ読み込みリンク関係
    gScreen = document.createElement('canvas');                   //仮想画面作成
    gScreen.height = HEIGHT;                                      //仮想画面の高さ設定
    gScreen.width  = WIDTH;                                       //仮想画面の幅設定
    
    WmSize();                                                     //画面サイズ初期化
    window.addEventListener("resize", function(){ WmSize() } );   //ブラウザ変更時にWmSize()を呼び出し
    timer = setTimeout("WmTimer()", gPlayerSpeedX);　　    　　　　 //33ms秒でWmTimer()を呼び出し
    BombMoveTimer();                                              //爆弾の動きアニメーション
    hardBlockLoad();                                              //ハードブロック初期ロード
    hardBlock2Load();                                             //ハードブロック２初期ロード
    softBlockLoad();                                              //ソフトブロック初期ロード
    BombLoad();                                                   //爆弾初期ロード
    
    this.setInterval(function () { GameTimer() }, 1000);
    this.setInterval(function () { grassImg()}, 33);
    death_boolen = false;
    items_boolen = false;
}


/*==================================================================================================
------------------------------------------効果音イベント----------------------------------------------
====================================================================================================*/

//==爆弾を置いた時の効果音===============================================================================
function bomb_put_sound()
{
    var audio = new Audio();
    audio.src = "sound/bomb.mp3"
    audio.play();
}


//==爆発時の効果音=====================================================================================
function explosion_sound()
{
    var audio = new Audio();
    audio.src = "sound/explosion.wav"
    audio.play();
}


//==アイテムゲットの効果音===============================================================================
function item_get_sound()
{
    var audio = new Audio();
    audio.src = "sound/item_get.wav"
    audio.play();
}


//==ゲームーオーバーの効果音==============================================================================
function gameover_sound()
{
    var audio = new Audio();
    audio.src = "sound/game_over.wav"
    audio.play();
}


//==ワープ時の効果音==============================================================================
function warp_sound()
{
    var audio = new Audio();
    audio.src = "sound/warp.wav"
    audio.play();
}

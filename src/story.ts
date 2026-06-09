export type StoryTone =
  | "sunset"
  | "bloom"
  | "secret"
  | "cloud"
  | "door"
  | "glow"
  | "blush"
  | "trust"
  | "stars";

export type StoryPage = {
  id: number;
  title: string;
  tone: StoryTone;
  lines: string[];
  image: string;
  imagePrompt: string;
};

const promptBase =
  "Use case: illustration-story\nAsset type: romantic interactive React story page illustration\nStyle/medium: soft children's book illustration, painterly pastel texture, rounded shapes, cinematic storybook lighting\nColor palette: pink theme with rose, peach, warm gold, muted lavender, soft teal accents\nComposition/framing: wide 16:10 scene, clear central action, generous negative space, no text\nConstraints: the two main characters are a small gentle boy named Xiao Yang and a small bright-eyed girl named Lily; keep them cute, warm, and consistent; no watermark; no written words inside the image\nAvoid: photorealism, harsh shadows, scary mood, cluttered background";

export const storyPages: StoryPage[] = [
  {
    id: 1,
    title: "在很大很大的世界里",
    tone: "sunset",
    lines: [
      "有一个小小的男孩，名字叫小杨。",
      "小杨是一个很好很好的人。他总是安安静静地努力，想把世界上最好的东西都找来。",
      "还有一个小小的女孩，名字叫莉莉。",
      "莉莉也是一个很好很好的人。她的眼睛里藏着星星，笑起来的时候，周围的空气都是甜的。",
    ],
    image: "/art/page-01.svg",
    imagePrompt: `${promptBase}\nPrimary request: two adorable tiny children sit beneath a gigantic oak tree while a warm orange sunset fills the sky.\nScene/backdrop: enormous oak, meadow, distant rosy clouds\nSubject: Xiao Yang and Lily sitting side by side under the tree, shy and peaceful\nLighting/mood: warm sunset, tender, magical`,
  },
  {
    id: 2,
    title: "最好最好的伙伴",
    tone: "bloom",
    lines: [
      "小杨和莉莉是最好最好的伙伴。",
      "他们一起看过清晨的第一缕光，也一起数过深夜的流星。",
      "小杨觉得，遇到莉莉，是他这辈子最幸运的事。",
      "他想，他会永远信任她，像信任春天的花一定会开那样。",
    ],
    image: "/art/page-02.svg",
    imagePrompt: `${promptBase}\nPrimary request: Xiao Yang and Lily hold hands while walking on a blooming forest path full of flowers.\nScene/backdrop: flower-filled woodland trail, dew, morning light with a hint of night stars fading\nSubject: the two children walking together, hand in hand\nLighting/mood: hopeful sunrise, soft and lucky`,
  },
  {
    id: 3,
    title: "一个普通的小秘密",
    tone: "secret",
    lines: [
      "可是有一天，小杨在树林里看到一个奇怪的景象。",
      "他看到莉莉悄悄把一件东西藏进树洞里，还对路过的长耳朵小兔子小声说了些什么。",
      "当小杨走过去问她时，莉莉眨着大眼睛，红着脸说：“没什么呀，只是一个普通的小秘密。”",
    ],
    image: "/art/page-03.svg",
    imagePrompt: `${promptBase}\nPrimary request: Xiao Yang peeks from behind a tree, puzzled and hurt, while Lily places a glowing object into a hollow in the oak tree and whispers to a long-eared rabbit.\nScene/backdrop: quiet forest, oak tree with a hollow, small flowers\nSubject: Lily hiding a glowing object; Xiao Yang half-hidden behind the tree\nLighting/mood: mysterious but gentle, pink dusk glow`,
  },
  {
    id: 4,
    title: "心里的小乌云",
    tone: "cloud",
    lines: [
      "小杨心里的小乌云开始乱跑了。",
      "他想：“为什么她不告诉我呢？她说谎了。难道她不再信任我了吗？还是她有别的好朋友了？”",
      "小杨觉得胸口酸酸的，像吃了一颗没有熟透的青柠檬。",
      "那个很好很好的小杨，第一次变得笨笨的。他开始躲避莉莉，把自己关进了一间灰色的小房子里。",
    ],
    image: "/art/page-04.svg",
    imagePrompt: `${promptBase}\nPrimary request: Xiao Yang sits inside a small gray cube-shaped room while tangled thought lines swirl around him.\nScene/backdrop: abstract soft pink space fading into gray, messy thought threads and tiny storm clouds\nSubject: Xiao Yang curled up, confused and lonely\nLighting/mood: muted, sour, emotionally cloudy but still tender`,
  },
  {
    id: 5,
    title: "门槛上的莉莉",
    tone: "door",
    lines: [
      "莉莉发现小杨不开心了。",
      "她跑去敲小杨的门，小杨却隔着窗户说：“你骗了我，你不再是那个对我坦白的莉莉了。”",
      "莉莉愣住了。她的眼眶慢慢变红，像两颗红豆。",
      "她没有跑开，也没有生气，而是坐在门槛上，小声地说：“小杨，你能不能出来听我说一句话？”",
    ],
    image: "/art/page-05.svg",
    imagePrompt: `${promptBase}\nPrimary request: Lily sits on the doorstep with red eyes while Xiao Yang lowers his head inside a dim room, separated by a thick wall and window.\nScene/backdrop: small cottage doorway, warm outside light, cool interior shadow\nSubject: Lily waiting gently at the threshold; Xiao Yang inside, sad\nLighting/mood: patient, tender, quiet heartbreak`,
  },
  {
    id: 6,
    title: "会发光的树洞",
    tone: "glow",
    lines: [
      "门慢慢开了。",
      "莉莉拉起小杨的手，带他回到了那个树洞前。",
      "“对不起，小杨。我确实说了谎，因为我想在你生日那天，送你一张完整的森林拼图。”",
      "莉莉从树洞里拿出一块块会发光的碎片：“我一直在偷偷收集你最喜欢的星光，想给你一个惊喜。”",
    ],
    image: "/art/page-06.svg",
    imagePrompt: `${promptBase}\nPrimary request: the oak tree hollow shines with many glowing puzzle pieces that hold tiny memories, while Lily holds Xiao Yang's hand and explains the birthday surprise.\nScene/backdrop: magical oak hollow, sparkling puzzle fragments floating softly\nSubject: Lily gently showing glowing fragments to Xiao Yang\nLighting/mood: radiant, forgiving, wonder-filled`,
  },
  {
    id: 7,
    title: "藏得太深的浪漫",
    tone: "blush",
    lines: [
      "原来，那些小杨以为的欺骗，其实是藏得太深的浪漫。",
      "小杨看着那些星光，觉得自己的脸比莉莉的红豆眼还要红。",
      "他小声说：“对不起。我只看到了那个谎言，却忘记了你是一个多么好的人。我不该乱猜，我应该直接问你的。”",
    ],
    image: "/art/page-07.svg",
    imagePrompt: `${promptBase}\nPrimary request: Xiao Yang blushes and scratches his head apologetically while Lily smiles through tears, both faces lit by glowing puzzle pieces.\nScene/backdrop: oak tree hollow, floating star fragments, soft rosy haze\nSubject: shy apology and relieved smile between the two children\nLighting/mood: warm, honest, tenderly romantic`,
  },
  {
    id: 8,
    title: "关于信任的拼图",
    tone: "trust",
    lines: [
      "莉莉拉住小杨的手说：“没关系。虽然我们都是很好很好的人，但我们也会有笨拙的时候。”",
      "“以后，如果我们心里有了小乌云，就一起把它们说出来，好吗？”",
      "小杨用力地点了点头。",
      "他们一起坐在树下，把那块关于信任的拼图，拼在了最中间。",
    ],
    image: "/art/page-08.svg",
    imagePrompt: `${promptBase}\nPrimary request: Xiao Yang and Lily sit beneath the oak tree and place a glowing central puzzle piece together.\nScene/backdrop: bright warm tree shade, scattered flower petals, puzzle board glowing softly\nSubject: both children collaborating on the puzzle, hands close together\nLighting/mood: clear, restored, cozy golden-pink warmth`,
  },
  {
    id: 9,
    title: "雾散以后",
    tone: "stars",
    lines: [
      "世界很大，误会偶尔会像雾一样飘过来。",
      "但只要我们愿意开口说话，愿意拉住对方的手，",
      "雾就会散去，阳光会重新照在两个很好很好的人的身上。",
    ],
    image: "/art/page-09.svg",
    imagePrompt: `${promptBase}\nPrimary request: Xiao Yang and Lily share a big warm hug under a sky full of stars beside the giant oak tree.\nScene/backdrop: starry night, the oak tree, soft mist lifting, golden light returning\nSubject: a gentle hug between the two children\nLighting/mood: romantic, peaceful, healed, luminous`,
  },
];

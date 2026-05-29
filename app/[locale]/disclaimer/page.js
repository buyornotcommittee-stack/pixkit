import { Link } from '../../../i18n/navigation';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { ko: '면책 조항', en: 'Disclaimer', ja: '免責事項', zh: '免责声明', fr: 'Avis de non-responsabilité', es: 'Aviso legal', hi: 'अस्वीकरण' };
  const descs = {
    ko: 'Pixkit 서비스 이용에 관한 면책 조항 및 책임의 한계.',
    en: 'Disclaimer and limitation of liability regarding the use of Pixkit services.',
    ja: 'Pixkitサービスの利用に関する免責事項および責任の制限。',
    zh: '关于Pixkit服务使用的免责声明和责任限制。',
    fr: 'Avis de non-responsabilité et limitation de responsabilité concernant l\'utilisation des services Pixkit.',
    es: 'Aviso legal y limitación de responsabilidad respecto al uso de los servicios de Pixkit.',
    hi: 'Pixkit सेवाओं के उपयोग के संबंध में अस्वीकरण और दायित्व की सीमा।',
  };
  const baseUrl = 'https://pixkit.app';
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const languages = {};
  ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'].forEach((l) => {
    const p = l === 'ko' ? '' : `/${l}`;
    languages[l] = `${baseUrl}${p}/disclaimer`;
  });
  languages['x-default'] = `${baseUrl}/disclaimer`;
  return {
    title: titles[locale] || titles.ko,
    description: descs[locale] || descs.ko,
    alternates: { canonical: `${baseUrl}${prefix}/disclaimer`, languages },
  };
}

const content = {
  ko: {
    title: '면책 조항',
    updated: '최종 업데이트: 2026년 4월 10일',
    sections: [
      { h: '일반 면책', p: 'Pixkit("본 서비스")은 무료로 제공되는 이미지 처리 도구입니다. 본 서비스는 "있는 그대로(as-is)" 제공되며, 명시적이든 묵시적이든 어떠한 보증도 제공하지 않습니다. 본 서비스의 사용으로 발생할 수 있는 직접적, 간접적, 부수적, 특별, 결과적 손해에 대해 운영자는 책임을 지지 않습니다.' },
      { h: '법적 조언 아님', p: 'Pixkit은 이미지 편집 및 처리 목적의 기술 도구이며, 법률, 저작권, 상표, 개인정보 보호 등과 관련된 법적 조언을 제공하지 않습니다. 특정 이미지의 사용, 배포, 편집이 법적으로 허용되는지 여부는 사용자가 직접 판단하거나 전문가의 조언을 구해야 합니다.' },
      { h: '저작권 및 이미지 사용 책임', p: '본 서비스를 통해 처리되는 이미지의 저작권은 사용자 본인에게 있으며, 사용자는 업로드하거나 처리하는 모든 이미지에 대한 적법한 권리를 보유해야 합니다. 타인의 저작권, 초상권, 상표권을 침해하는 이미지의 처리 및 사용에 대한 모든 법적 책임은 사용자에게 있으며, 운영자는 이에 대해 책임을 지지 않습니다.' },
      { h: '처리 결과의 정확성', p: 'Pixkit의 AI 기반 도구(배경 제거 등)는 딥러닝 모델을 사용하여 자동으로 이미지를 처리합니다. 처리 결과의 정확성, 품질, 적합성에 대해 보증하지 않으며, 전문적인 용도로 사용 시 반드시 결과물을 검토하시기 바랍니다.' },
      { h: '서비스 중단', p: '운영자는 사전 고지 없이 본 서비스의 전부 또는 일부를 중단, 변경, 수정할 수 있습니다. 서비스 중단으로 인한 손실에 대해 운영자는 책임을 지지 않습니다.' },
      { h: '외부 링크', p: '본 서비스에는 외부 웹사이트로 연결되는 링크가 포함될 수 있습니다. 운영자는 해당 외부 사이트의 콘텐츠, 정책, 행위에 대해 책임을 지지 않으며, 방문은 사용자 본인의 책임 하에 이루어집니다.' },
      { h: '광고 및 제3자 서비스', p: '본 서비스는 Google AdSense 등 제3자 광고 서비스를 통해 광고를 표시할 수 있습니다. 광고 내용 및 광고주와의 거래에 대해 운영자는 책임을 지지 않습니다.' },
    ],
  },
  en: {
    title: 'Disclaimer',
    updated: 'Last updated: April 10, 2026',
    sections: [
      { h: 'General Disclaimer', p: 'Pixkit ("the Service") is a free image processing tool provided on an "as-is" basis without any warranties, express or implied. The operator shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of the Service.' },
      { h: 'Not Legal Advice', p: 'Pixkit is a technical tool for image editing and processing. It does not provide legal advice regarding copyright, trademark, privacy, or any other legal matter. Users are responsible for determining whether their use, distribution, or editing of specific images is legally permissible, and should seek professional advice when needed.' },
      { h: 'Copyright and Image Use Responsibility', p: 'The copyright of images processed through the Service belongs to the user. Users must hold lawful rights to any image they upload or process. All legal responsibility for processing or using images that infringe upon others\' copyrights, portrait rights, or trademarks rests with the user. The operator assumes no liability for such infringement.' },
      { h: 'Accuracy of Processing Results', p: 'Pixkit\'s AI-based tools (such as background removal) use deep learning models to process images automatically. We do not guarantee the accuracy, quality, or suitability of processed results. Please review outputs carefully before professional use.' },
      { h: 'Service Interruption', p: 'The operator may suspend, modify, or discontinue all or part of the Service without prior notice. The operator is not liable for any losses arising from service interruptions.' },
      { h: 'External Links', p: 'The Service may contain links to external websites. The operator is not responsible for the content, policies, or practices of those external sites. Users visit such sites at their own risk.' },
      { h: 'Advertising and Third-Party Services', p: 'The Service may display advertisements via third-party networks such as Google AdSense. The operator is not responsible for the content of advertisements or transactions with advertisers.' },
    ],
  },
  ja: {
    title: '免責事項',
    updated: '最終更新: 2026年4月10日',
    sections: [
      { h: '一般免責', p: 'Pixkit（「本サービス」）は無料で提供される画像処理ツールです。本サービスは「現状有姿（as-is）」で提供され、明示または黙示を問わず、いかなる保証も行いません。本サービスの利用によって生じる直接的、間接的、付随的、特別な、または結果的な損害について運営者は責任を負いません。' },
      { h: '法的助言ではない', p: 'Pixkitは画像編集・処理のための技術ツールであり、法律、著作権、商標、個人情報保護などに関する法的助言を提供するものではありません。特定の画像の使用、配布、編集が法的に許容されるかどうかは、利用者ご自身で判断いただくか、専門家に相談してください。' },
      { h: '著作権および画像使用の責任', p: '本サービスで処理される画像の著作権は利用者本人に帰属し、利用者はアップロードまたは処理するすべての画像について適法な権利を有する必要があります。他者の著作権、肖像権、商標権を侵害する画像の処理および使用に関するすべての法的責任は利用者にあり、運営者は責任を負いません。' },
      { h: '処理結果の精度', p: 'PixkitのAIベースのツール（背景除去など）はディープラーニングモデルを使用して画像を自動処理します。処理結果の精度、品質、適合性について保証しません。専門的な用途で使用する際は必ず結果を確認してください。' },
      { h: 'サービスの中断', p: '運営者は事前の通知なく本サービスの全部または一部を中断、変更、修正することができます。サービス中断による損失について運営者は責任を負いません。' },
      { h: '外部リンク', p: '本サービスには外部ウェブサイトへのリンクが含まれる場合があります。運営者は当該外部サイトのコンテンツ、ポリシー、行為について責任を負わず、訪問は利用者自身の責任で行ってください。' },
      { h: '広告および第三者サービス', p: '本サービスはGoogle AdSenseなどの第三者広告サービスを通じて広告を表示することがあります。広告の内容および広告主との取引について運営者は責任を負いません。' },
    ],
  },
  zh: {
    title: '免责声明',
    updated: '最后更新：2026年4月10日',
    sections: [
      { h: '一般免责', p: 'Pixkit（"本服务"）是免费提供的图片处理工具。本服务按"现状（as-is）"提供，不提供任何明示或暗示的保证。对因使用本服务而可能产生的任何直接、间接、附带、特殊或后果性损害，运营方不承担责任。' },
      { h: '非法律建议', p: 'Pixkit是用于图片编辑和处理的技术工具，不提供有关法律、版权、商标、隐私等方面的法律建议。用户应自行判断或咨询专业人士，以确定特定图片的使用、分发、编辑是否合法。' },
      { h: '版权和图片使用责任', p: '通过本服务处理的图片的版权归用户本人所有，用户必须对其上传或处理的所有图片拥有合法权利。因处理或使用侵犯他人版权、肖像权或商标权的图片而产生的所有法律责任由用户承担，运营方概不负责。' },
      { h: '处理结果的准确性', p: 'Pixkit的基于AI的工具（如背景移除）使用深度学习模型自动处理图片。我们不保证处理结果的准确性、质量或适用性。专业使用前请仔细检查输出结果。' },
      { h: '服务中断', p: '运营方可在不事先通知的情况下暂停、修改或终止本服务的全部或部分。运营方对因服务中断造成的任何损失概不负责。' },
      { h: '外部链接', p: '本服务可能包含指向外部网站的链接。运营方对这些外部网站的内容、政策或行为概不负责，用户访问需自行承担风险。' },
      { h: '广告和第三方服务', p: '本服务可能通过Google AdSense等第三方广告网络展示广告。运营方对广告内容及与广告商的交易概不负责。' },
    ],
  },
  fr: {
    title: 'Avis de non-responsabilité',
    updated: 'Dernière mise à jour : 10 avril 2026',
    sections: [
      { h: 'Avis général', p: 'Pixkit (« le Service ») est un outil gratuit de traitement d\'image fourni « en l\'état » sans aucune garantie, expresse ou implicite. L\'opérateur ne saurait être tenu responsable de tout dommage direct, indirect, accessoire, spécial ou consécutif résultant de l\'utilisation du Service.' },
      { h: 'Pas de conseil juridique', p: 'Pixkit est un outil technique d\'édition et de traitement d\'images. Il ne fournit pas de conseils juridiques concernant le droit d\'auteur, les marques, la vie privée ou toute autre question juridique. Les utilisateurs sont responsables de déterminer si leur utilisation, distribution ou édition d\'images spécifiques est légalement autorisée.' },
      { h: 'Responsabilité en matière de droits d\'auteur', p: 'Les droits d\'auteur des images traitées via le Service appartiennent à l\'utilisateur. Les utilisateurs doivent détenir les droits légaux sur toute image qu\'ils téléchargent ou traitent. Toute responsabilité légale liée au traitement ou à l\'utilisation d\'images portant atteinte aux droits d\'auteur, droits à l\'image ou marques de tiers incombe à l\'utilisateur.' },
      { h: 'Précision des résultats', p: 'Les outils basés sur l\'IA de Pixkit (comme la suppression de fond) utilisent des modèles d\'apprentissage profond pour traiter les images automatiquement. Nous ne garantissons pas la précision, la qualité ou l\'adéquation des résultats. Veuillez vérifier attentivement les sorties avant une utilisation professionnelle.' },
      { h: 'Interruption de service', p: 'L\'opérateur peut suspendre, modifier ou interrompre tout ou partie du Service sans préavis. L\'opérateur n\'est pas responsable des pertes résultant d\'interruptions de service.' },
      { h: 'Liens externes', p: 'Le Service peut contenir des liens vers des sites web externes. L\'opérateur n\'est pas responsable du contenu, des politiques ou des pratiques de ces sites externes. Les utilisateurs visitent ces sites à leurs propres risques.' },
      { h: 'Publicité et services tiers', p: 'Le Service peut afficher des publicités via des réseaux tiers tels que Google AdSense. L\'opérateur n\'est pas responsable du contenu des publicités ni des transactions avec les annonceurs.' },
    ],
  },
  es: {
    title: 'Aviso legal',
    updated: 'Última actualización: 10 de abril de 2026',
    sections: [
      { h: 'Aviso general', p: 'Pixkit ("el Servicio") es una herramienta gratuita de procesamiento de imágenes proporcionada "tal cual" (as-is) sin garantías de ningún tipo, expresas o implícitas. El operador no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso del Servicio.' },
      { h: 'No es asesoramiento legal', p: 'Pixkit es una herramienta técnica para la edición y el procesamiento de imágenes. No proporciona asesoramiento legal en materia de derechos de autor, marcas registradas, privacidad ni ningún otro asunto legal. Los usuarios son responsables de determinar si el uso, distribución o edición de imágenes específicas es legalmente permisible.' },
      { h: 'Derechos de autor y uso de imágenes', p: 'Los derechos de autor de las imágenes procesadas a través del Servicio pertenecen al usuario. Los usuarios deben tener los derechos legales sobre cualquier imagen que suban o procesen. Toda responsabilidad legal por el procesamiento o uso de imágenes que infrinjan derechos de autor, derechos de imagen o marcas registradas de terceros recae en el usuario.' },
      { h: 'Precisión de los resultados', p: 'Las herramientas basadas en IA de Pixkit (como la eliminación de fondo) utilizan modelos de aprendizaje profundo para procesar imágenes automáticamente. No garantizamos la precisión, calidad o idoneidad de los resultados. Por favor, revise cuidadosamente las salidas antes de un uso profesional.' },
      { h: 'Interrupción del servicio', p: 'El operador puede suspender, modificar o interrumpir todo o parte del Servicio sin previo aviso. El operador no es responsable de las pérdidas derivadas de interrupciones del servicio.' },
      { h: 'Enlaces externos', p: 'El Servicio puede contener enlaces a sitios web externos. El operador no es responsable del contenido, las políticas o las prácticas de dichos sitios externos. Los usuarios visitan estos sitios bajo su propio riesgo.' },
      { h: 'Publicidad y servicios de terceros', p: 'El Servicio puede mostrar anuncios a través de redes de terceros como Google AdSense. El operador no es responsable del contenido de los anuncios ni de las transacciones con los anunciantes.' },
    ],
  },
};

export default async function DisclaimerPage({ params }) {
  const { locale } = await params;
  const c = content[locale] || content.ko;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-heading mb-2">{c.title}</h1>
      <p className="text-text-muted text-xs mb-10">{c.updated}</p>

      <div className="space-y-8">
        {c.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-lg font-semibold font-heading text-gold mb-3">{i + 1}. {s.h}</h2>
            <p className="text-text-secondary text-sm leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

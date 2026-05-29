import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { ko: '이용약관', en: 'Terms of Service', ja: '利用規約', zh: '使用条款', fr: 'Conditions d\'utilisation', es: 'Términos de servicio', hi: 'सेवा की शर्तें' };
  const descs = {
    ko: 'Pixkit 이용약관 — 서비스 이용 조건 및 면책 사항 안내.',
    en: 'Pixkit Terms of Service — Terms and conditions for using the service.',
    ja: 'Pixkit 利用規約 — サービス利用条件および免責事項のご案内。',
    zh: 'Pixkit 使用条款 — 服务使用条件及免责声明。',
    fr: 'Conditions d\'utilisation Pixkit — Conditions et mentions légales relatives à l\'utilisation du service.',
    es: 'Términos de servicio de Pixkit — Condiciones y avisos legales relativos al uso del servicio.',
    hi: 'Pixkit सेवा की शर्तें — सेवा उपयोग की शर्तें और नियम।',
  };
  const baseUrl = 'https://pixkit.app';
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const languages = {};
  ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'].forEach((l) => {
    const p = l === 'ko' ? '' : `/${l}`;
    languages[l] = `${baseUrl}${p}/terms`;
  });
  languages['x-default'] = `${baseUrl}/terms`;
  return {
    title: titles[locale] || titles.ko,
    description: descs[locale] || descs.ko,
    alternates: { canonical: `${baseUrl}${prefix}/terms`, languages },
  };
}

const content = {
  ko: {
    title: '이용약관',
    effective: '시행일: 2026년 1월 1일 | 최종 수정: 2026년 2월 20일',
    sections: [
      { heading: '제1조 (목적)', body: '본 약관은 Pixkit(이하 "서비스")의 이용에 관한 조건과 절차, 운영자와 이용자의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.' },
      { heading: '제2조 (서비스의 내용)', body: 'Pixkit은 웹 브라우저 기반의 무료 이미지 처리 도구로, 다음과 같은 기능을 제공합니다.', list: ['이미지 리사이즈 (단일 및 일괄 처리)', '이미지 크롭 (자유 비율 및 고정 비율)', '이미지 회전 및 뒤집기', '파일 형식 변환 (JPG, PNG, WebP, GIF, BMP, HEIC)', '이미지를 PDF로 변환', 'PDF를 이미지로 변환', '워터마크 추가 (텍스트 및 로고)'], after: '모든 이미지 처리는 사용자의 웹 브라우저 내에서 수행되며, 이미지가 외부 서버로 전송되지 않습니다.' },
      { heading: '제3조 (서비스 이용)', body: '서비스는 별도의 회원가입 없이 누구나 무료로 이용할 수 있습니다. 서비스 이용에 따른 데이터 통신료는 이용자가 부담합니다.' },
      { heading: '제4조 (이용자의 의무)', body: '이용자는 다음 행위를 해서는 안 됩니다.', list: ['서비스를 이용하여 타인의 저작권이나 초상권 등 권리를 침해하는 행위', '서비스의 정상적 운영을 방해하는 행위', '서비스를 이용하여 불법적인 콘텐츠를 생성하거나 배포하는 행위', '서비스의 기능을 악용하여 자동화된 대량 처리를 수행하는 행위'] },
      { heading: '제5조 (지적재산권)', body: '서비스의 디자인, 소스코드, 로고 등에 대한 지적재산권은 운영자에게 귀속됩니다. 이용자가 서비스를 통해 처리한 이미지에 대한 권리는 이용자 본인에게 있습니다.' },
      { heading: '제6조 (면책 사항)', list: ['서비스는 "있는 그대로(AS IS)" 제공되며, 특정 목적에 대한 적합성이나 결과물의 정확성을 보증하지 않습니다.', '이미지 처리 과정에서 발생할 수 있는 품질 변화, 데이터 손실 등에 대해 운영자는 책임을 지지 않습니다.', '천재지변, 시스템 장애 등 불가항력적인 사유로 서비스를 제공하지 못하는 경우 운영자는 책임을 지지 않습니다.', '이용자가 서비스를 통해 처리한 이미지의 내용과 사용에 대한 책임은 이용자 본인에게 있습니다.'] },
      { heading: '제7조 (서비스의 변경 및 중단)', body: '운영자는 서비스의 기능을 추가, 변경 또는 중단할 수 있습니다. 서비스의 중요한 변경 사항은 서비스 내 공지를 통해 안내하겠습니다.' },
      { heading: '제8조 (광고 게재)', body: '서비스는 운영비 충당을 위해 Google AdSense 등의 광고를 게재할 수 있습니다. 광고로 인한 손해에 대해 운영자는 책임을 지지 않습니다.' },
      { heading: '제9조 (약관의 변경)', body: '본 약관은 관련 법령의 변경이나 서비스 정책의 변경에 따라 수정될 수 있습니다. 변경된 약관은 본 페이지에 게시하며, 게시한 날로부터 효력이 발생합니다.' },
      { heading: '제10조 (준거법 및 관할)', body: '본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련하여 발생하는 분쟁에 대해서는 운영자의 소재지를 관할하는 법원을 합의 관할로 합니다.' },
      { heading: '문의', contact: true },
    ],
  },
  en: {
    title: 'Terms of Service',
    effective: 'Effective: January 1, 2026 | Last Updated: February 20, 2026',
    sections: [
      { heading: 'Article 1 (Purpose)', body: 'These Terms govern the conditions, procedures, and respective rights, obligations, and responsibilities of the operator and users in relation to the use of Pixkit (hereinafter "the Service").' },
      { heading: 'Article 2 (Service Description)', body: 'Pixkit is a free browser-based image processing tool that provides the following features:', list: ['Image resizing (single and batch)', 'Image cropping (free ratio and fixed ratio)', 'Image rotation and flipping', 'File format conversion (JPG, PNG, WebP, GIF, BMP, HEIC)', 'Image to PDF conversion', 'PDF to image conversion', 'Watermark addition (text and logo)'], after: 'All image processing is performed within the user\'s web browser, and images are not transmitted to external servers.' },
      { heading: 'Article 3 (Use of Service)', body: 'The Service is available to anyone free of charge without registration. Data communication charges incurred from using the Service are borne by the user.' },
      { heading: 'Article 4 (User Obligations)', body: 'Users must not engage in the following activities:', list: ['Infringing on the copyrights, portrait rights, or other rights of others using the Service', 'Interfering with the normal operation of the Service', 'Creating or distributing illegal content using the Service', 'Abusing the Service\'s features to perform automated mass processing'] },
      { heading: 'Article 5 (Intellectual Property)', body: 'Intellectual property rights for the Service\'s design, source code, logo, etc. belong to the operator. Rights to images processed by users through the Service belong to the users themselves.' },
      { heading: 'Article 6 (Disclaimer)', list: ['The Service is provided "AS IS" and does not guarantee fitness for a particular purpose or accuracy of results.', 'The operator is not responsible for quality changes or data loss that may occur during image processing.', 'The operator is not responsible for inability to provide the Service due to force majeure events such as natural disasters or system failures.', 'Users are responsible for the content and use of images processed through the Service.'] },
      { heading: 'Article 7 (Service Changes and Suspension)', body: 'The operator may add, modify, or suspend the Service\'s features. Significant changes to the Service will be communicated through in-service announcements.' },
      { heading: 'Article 8 (Advertising)', body: 'The Service may display advertisements through Google AdSense and other platforms to cover operating costs. The operator is not responsible for damages caused by advertisements.' },
      { heading: 'Article 9 (Amendment of Terms)', body: 'These Terms may be modified in accordance with changes in relevant laws or service policies. Amended Terms will be posted on this page and take effect from the date of posting.' },
      { heading: 'Article 10 (Governing Law and Jurisdiction)', body: 'These Terms shall be interpreted in accordance with the laws of the Republic of Korea. Any disputes arising in connection with the use of the Service shall be subject to the agreed jurisdiction of the court having jurisdiction over the operator\'s location.' },
      { heading: 'Contact', contact: true },
    ],
  },
  ja: {
    title: '利用規約',
    effective: '施行日: 2026年1月1日 | 最終更新: 2026年2月20日',
    sections: [
      { heading: '第1条（目的）', body: '本規約は、Pixkit（以下「本サービス」）の利用に関する条件および手続き、運営者と利用者の権利、義務および責任事項を定めることを目的とします。' },
      { heading: '第2条（サービスの内容）', body: 'Pixkitは、ウェブブラウザベースの無料画像処理ツールで、以下の機能を提供します。', list: ['画像リサイズ（単一およびバッチ処理）', '画像クロップ（自由比率および固定比率）', '画像の回転・反転', 'ファイル形式変換（JPG、PNG、WebP、GIF、BMP、HEIC）', '画像からPDFへの変換', 'PDFから画像への変換', 'ウォーターマーク追加（テキストおよびロゴ）'], after: 'すべての画像処理はユーザーのウェブブラウザ内で実行され、画像が外部サーバーに送信されることはありません。' },
      { heading: '第3条（サービスの利用）', body: '本サービスは、会員登録不要で、どなたでも無料でご利用いただけます。サービスの利用に伴うデータ通信料は利用者の負担となります。' },
      { heading: '第4条（利用者の義務）', body: '利用者は以下の行為をしてはなりません。', list: ['本サービスを利用して他者の著作権や肖像権等の権利を侵害する行為', '本サービスの正常な運営を妨害する行為', '本サービスを利用して違法なコンテンツを作成または配布する行為', '本サービスの機能を悪用して自動化された大量処理を行う行為'] },
      { heading: '第5条（知的財産権）', body: '本サービスのデザイン、ソースコード、ロゴ等に関する知的財産権は運営者に帰属します。利用者が本サービスを通じて処理した画像に関する権利は、利用者本人に帰属します。' },
      { heading: '第6条（免責事項）', list: ['本サービスは「現状のまま（AS IS）」で提供され、特定の目的への適合性や結果物の正確性を保証しません。', '画像処理過程で発生し得る品質の変化やデータの損失等について、運営者は責任を負いません。', '天災、システム障害等の不可抗力により本サービスを提供できない場合、運営者は責任を負いません。', '利用者が本サービスを通じて処理した画像の内容および使用に関する責任は、利用者本人にあります。'] },
      { heading: '第7条（サービスの変更および中断）', body: '運営者は本サービスの機能を追加、変更、または中断することができます。サービスの重要な変更事項は、サービス内のお知らせを通じてご案内します。' },
      { heading: '第8条（広告掲載）', body: '本サービスは、運営費を賄うためにGoogle AdSense等の広告を掲載する場合があります。広告による損害について運営者は責任を負いません。' },
      { heading: '第9条（規約の変更）', body: '本規約は、関連法令の変更やサービスポリシーの変更に応じて修正される場合があります。変更された規約は本ページに掲載し、掲載した日から効力が発生します。' },
      { heading: '第10条（準拠法および管轄）', body: '本規約は大韓民国の法律に従って解釈され、本サービスの利用に関して発生する紛争については、運営者の所在地を管轄する裁判所を合意管轄とします。' },
      { heading: 'お問い合わせ', contact: true },
    ],
  },
  zh: {
    title: '使用条款',
    effective: '生效日期：2026年1月1日 | 最后更新：2026年2月20日',
    sections: [
      { heading: '第一条（目的）', body: '本条款旨在规定Pixkit（以下简称"本服务"）的使用条件和程序，以及运营者与用户的权利、义务和责任事项。' },
      { heading: '第二条（服务内容）', body: 'Pixkit是基于网页浏览器的免费图片处理工具，提供以下功能：', list: ['图片调整大小（单张及批量处理）', '图片裁剪（自由比例及固定比例）', '图片旋转和翻转', '文件格式转换（JPG、PNG、WebP、GIF、BMP、HEIC）', '图片转PDF', 'PDF转图片', '添加水印（文字和Logo）'], after: '所有图片处理均在用户的网页浏览器中执行，图片不会被传输到外部服务器。' },
      { heading: '第三条（服务使用）', body: '本服务无需注册，任何人均可免费使用。使用服务产生的数据通信费用由用户承担。' },
      { heading: '第四条（用户义务）', body: '用户不得从事以下行为：', list: ['利用本服务侵犯他人著作权、肖像权等权利的行为', '妨碍本服务正常运营的行为', '利用本服务创建或传播违法内容的行为', '滥用本服务功能进行自动化大规模处理的行为'] },
      { heading: '第五条（知识产权）', body: '本服务的设计、源代码、Logo等知识产权归运营者所有。用户通过本服务处理的图片权利归用户本人所有。' },
      { heading: '第六条（免责声明）', list: ['本服务按"现状（AS IS）"提供，不保证对特定目的的适用性或结果的准确性。', '对于图片处理过程中可能发生的质量变化、数据丢失等，运营者不承担责任。', '因自然灾害、系统故障等不可抗力原因无法提供服务时，运营者不承担责任。', '用户通过本服务处理的图片内容及使用责任由用户本人承担。'] },
      { heading: '第七条（服务变更和中断）', body: '运营者可以添加、变更或中断本服务的功能。服务的重要变更将通过服务内公告进行通知。' },
      { heading: '第八条（广告投放）', body: '本服务可能会通过Google AdSense等投放广告以支付运营费用。运营者不对广告造成的损失承担责任。' },
      { heading: '第九条（条款变更）', body: '本条款可能会根据相关法律法规或服务政策的变更而修改。修改后的条款将发布在本页面，自发布之日起生效。' },
      { heading: '第十条（适用法律及管辖）', body: '本条款依据大韩民国法律进行解释，与本服务使用相关的纠纷以运营者所在地的管辖法院为约定管辖法院。' },
      { heading: '联系方式', contact: true },
    ],
  },
  fr: {
    title: 'Conditions d\'utilisation',
    effective: 'Date d\'effet : 1er janvier 2026 | Dernière mise à jour : 20 février 2026',
    sections: [
      { heading: 'Article 1 (Objet)', body: 'Les présentes Conditions régissent les conditions, procédures, droits, obligations et responsabilités respectifs de l\'opérateur et des utilisateurs dans le cadre de l\'utilisation de Pixkit (ci-après « le Service »).' },
      { heading: 'Article 2 (Description du service)', body: 'Pixkit est un outil gratuit de traitement d\'images basé sur le navigateur web, offrant les fonctionnalités suivantes :', list: ['Redimensionnement d\'images (unitaire et par lot)', 'Recadrage d\'images (ratio libre et ratio fixe)', 'Rotation et retournement d\'images', 'Conversion de format de fichier (JPG, PNG, WebP, GIF, BMP, HEIC)', 'Conversion d\'images en PDF', 'Conversion de PDF en images', 'Ajout de filigrane (texte et logo)'], after: 'Tous les traitements d\'images sont effectués dans le navigateur web de l\'utilisateur et les images ne sont pas transmises à des serveurs externes.' },
      { heading: 'Article 3 (Utilisation du service)', body: 'Le Service est accessible à tous gratuitement et sans inscription. Les frais de communication de données liés à l\'utilisation du Service sont à la charge de l\'utilisateur.' },
      { heading: 'Article 4 (Obligations de l\'utilisateur)', body: 'Les utilisateurs ne doivent pas se livrer aux activités suivantes :', list: ['Porter atteinte aux droits d\'auteur, droits à l\'image ou autres droits d\'autrui via le Service', 'Interférer avec le fonctionnement normal du Service', 'Créer ou distribuer du contenu illégal via le Service', 'Abuser des fonctionnalités du Service pour effectuer des traitements automatisés en masse'] },
      { heading: 'Article 5 (Propriété intellectuelle)', body: 'Les droits de propriété intellectuelle relatifs au design, au code source, au logo, etc. du Service appartiennent à l\'opérateur. Les droits sur les images traitées par les utilisateurs via le Service appartiennent aux utilisateurs eux-mêmes.' },
      { heading: 'Article 6 (Limitation de responsabilité)', list: ['Le Service est fourni « EN L\'ÉTAT » et ne garantit pas l\'adéquation à un usage particulier ni l\'exactitude des résultats.', 'L\'opérateur n\'est pas responsable des changements de qualité ou des pertes de données pouvant survenir lors du traitement des images.', 'L\'opérateur n\'est pas responsable de l\'impossibilité de fournir le Service en raison de cas de force majeure tels que des catastrophes naturelles ou des pannes système.', 'Les utilisateurs sont responsables du contenu et de l\'utilisation des images traitées via le Service.'] },
      { heading: 'Article 7 (Modifications et suspension du service)', body: 'L\'opérateur peut ajouter, modifier ou suspendre les fonctionnalités du Service. Les modifications importantes du Service seront communiquées via des annonces dans le service.' },
      { heading: 'Article 8 (Publicité)', body: 'Le Service peut afficher des publicités via Google AdSense et d\'autres plateformes pour couvrir les frais de fonctionnement. L\'opérateur n\'est pas responsable des dommages causés par les publicités.' },
      { heading: 'Article 9 (Modification des conditions)', body: 'Les présentes Conditions peuvent être modifiées conformément aux évolutions des lois applicables ou des politiques du service. Les Conditions modifiées seront publiées sur cette page et prendront effet à compter de la date de publication.' },
      { heading: 'Article 10 (Droit applicable et juridiction)', body: 'Les présentes Conditions sont interprétées conformément au droit de la République de Corée. Tout litige lié à l\'utilisation du Service sera soumis à la juridiction compétente du lieu de résidence de l\'opérateur.' },
      { heading: 'Contact', contact: true },
    ],
  },
  es: {
    title: 'Términos de servicio',
    effective: 'Fecha de vigencia: 1 de enero de 2026 | Última actualización: 20 de febrero de 2026',
    sections: [
      { heading: 'Artículo 1 (Propósito)', body: 'Estos Términos rigen las condiciones, procedimientos y los derechos, obligaciones y responsabilidades respectivos del operador y los usuarios en relación con el uso de Pixkit (en adelante "el Servicio").' },
      { heading: 'Artículo 2 (Descripción del servicio)', body: 'Pixkit es una herramienta gratuita de procesamiento de imágenes basada en navegador web que ofrece las siguientes funciones:', list: ['Redimensionamiento de imágenes (individual y por lotes)', 'Recorte de imágenes (proporción libre y fija)', 'Rotación y volteo de imágenes', 'Conversión de formato de archivo (JPG, PNG, WebP, GIF, BMP, HEIC)', 'Conversión de imágenes a PDF', 'Conversión de PDF a imágenes', 'Adición de marca de agua (texto y logo)'], after: 'Todo el procesamiento de imágenes se realiza dentro del navegador web del usuario y las imágenes no se transmiten a servidores externos.' },
      { heading: 'Artículo 3 (Uso del servicio)', body: 'El Servicio está disponible para cualquier persona de forma gratuita sin necesidad de registro. Los costos de comunicación de datos derivados del uso del Servicio corren por cuenta del usuario.' },
      { heading: 'Artículo 4 (Obligaciones del usuario)', body: 'Los usuarios no deben realizar las siguientes actividades:', list: ['Infringir los derechos de autor, derechos de imagen u otros derechos de terceros mediante el Servicio', 'Interferir con el funcionamiento normal del Servicio', 'Crear o distribuir contenido ilegal mediante el Servicio', 'Abusar de las funciones del Servicio para realizar procesamiento masivo automatizado'] },
      { heading: 'Artículo 5 (Propiedad intelectual)', body: 'Los derechos de propiedad intelectual del diseño, código fuente, logotipo, etc. del Servicio pertenecen al operador. Los derechos sobre las imágenes procesadas por los usuarios a través del Servicio pertenecen a los propios usuarios.' },
      { heading: 'Artículo 6 (Exención de responsabilidad)', list: ['El Servicio se proporciona "TAL CUAL" y no garantiza la idoneidad para un propósito particular ni la precisión de los resultados.', 'El operador no es responsable de los cambios de calidad o la pérdida de datos que puedan ocurrir durante el procesamiento de imágenes.', 'El operador no es responsable de la imposibilidad de prestar el Servicio debido a causas de fuerza mayor como desastres naturales o fallos del sistema.', 'Los usuarios son responsables del contenido y uso de las imágenes procesadas a través del Servicio.'] },
      { heading: 'Artículo 7 (Cambios y suspensión del servicio)', body: 'El operador puede agregar, modificar o suspender las funciones del Servicio. Los cambios importantes del Servicio se comunicarán mediante anuncios dentro del servicio.' },
      { heading: 'Artículo 8 (Publicidad)', body: 'El Servicio puede mostrar anuncios a través de Google AdSense y otras plataformas para cubrir los costos operativos. El operador no es responsable de los daños causados por los anuncios.' },
      { heading: 'Artículo 9 (Modificación de los términos)', body: 'Estos Términos pueden modificarse de acuerdo con cambios en las leyes aplicables o políticas del servicio. Los Términos modificados se publicarán en esta página y entrarán en vigor a partir de la fecha de publicación.' },
      { heading: 'Artículo 10 (Ley aplicable y jurisdicción)', body: 'Estos Términos se interpretarán de acuerdo con las leyes de la República de Corea. Cualquier disputa que surja en relación con el uso del Servicio estará sujeta a la jurisdicción acordada del tribunal competente en la ubicación del operador.' },
      { heading: 'Contacto', contact: true },
    ],
  },
};

const contactInfo = {
  ko: { service: '서비스명', operator: '운영자', opValue: '개인 운영', email: '이메일' },
  en: { service: 'Service', operator: 'Operator', opValue: 'Individual', email: 'Email' },
  ja: { service: 'サービス名', operator: '運営者', opValue: '個人運営', email: 'メール' },
  zh: { service: '服务名称', operator: '运营者', opValue: '个人运营', email: '邮箱' },
  fr: { service: 'Service', operator: 'Opérateur', opValue: 'Individuel', email: 'E-mail' },
  es: { service: 'Servicio', operator: 'Operador', opValue: 'Individual', email: 'Correo electrónico' },
};

export default async function TermsPage({ params }) {
  const { locale } = await params;
  const c = content[locale] || content.ko;
  const ci = contactInfo[locale] || contactInfo.ko;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold font-heading mb-6">{c.title}</h1>
      <p className="text-text-muted text-sm mb-8">{c.effective}</p>

      <div className="prose-custom space-y-8 text-text-secondary text-sm leading-relaxed">
        {c.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-semibold text-text-primary mb-3">{s.heading}</h2>
            {s.body && <p>{s.body}</p>}
            {s.list && (
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {s.list.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )}
            {s.after && <p className="mt-2">{s.after}</p>}
            {s.contact && (
              <p className="mt-2">{ci.service}: Pixkit<br />{ci.operator}: {ci.opValue}<br />{ci.email}: buyornotcommittee@gmail.com</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 30,
  },
  centerTextContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  mainTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  subText: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
  },
  ctaText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  chapterSectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  chapterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
    rowGap: 16,
  },
  chapterCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  chapterTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
    paddingBottom: 100,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'transparent',
  },
  
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  footerLinkText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  socialIcons: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  iconSpacing: {
    marginHorizontal: 8,
  },
  legalText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  languageSwitcher: {
    flexDirection: 'row',
    gap: 12,
  },
});
export default styles;
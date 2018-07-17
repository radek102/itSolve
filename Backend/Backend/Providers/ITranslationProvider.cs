using Backend.DatabaseModels;

namespace Backend.Providers
{
    public interface ITranslationProvider
    {
        string DefaultLanguage { get; set; }
        Translation GetTranslation(string translation);
        Translation GetTranslation(string translation, string language);
    }
}

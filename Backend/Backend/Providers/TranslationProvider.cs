using Backend.DatabaseModels;
using Backend.Models;
using System.Linq;
using System;

namespace Backend.Providers
{
    public class TranslationProvider : ITranslationProvider
    {
        private DatabaseContext databaseContext;

        public TranslationProvider()
        {
            databaseContext = new DatabaseContext();
            DefaultLanguage = "EN";
        }

        public string DefaultLanguage { get; set; }

        public Translation GetTranslation(string key, string language)
        {
            Translation translation = databaseContext.Translations.FirstOrDefault(t => t.Language == language && t.Key == key);
            if (translation == null)
            {
                translation = new Translation
                {
                    Key = key,
                    Text = key,
                    Language = language
                };
            }
            return translation;
        }

        public Translation GetTranslation(string key)
        {
            return GetTranslation(key, DefaultLanguage);
        }
    }
}
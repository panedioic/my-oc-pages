'use strict';

hexo.extend.generator.register('story', function(locals) {
    const results = [];
    const storyPages = locals.pages.filter(page => page.layout === 'story').toArray();

    // 生成故事首页
    results.push({
        path: 'story/index.html',
        layout: 'story',
        data: {
            is_chapter: false,
            stories: processStoryPages(storyPages)
        }
    });

    // 为每个章节生成页面
    storyPages.forEach(page => {
        // 获取当前书籍的所有章节
        const bookChapters = storyPages
            .filter(p => p.book === page.book)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // 找到当前章节的索引
        const currentIndex = bookChapters.findIndex(p => p.path === page.path);
        
        // 确定上一章和下一章
        const prevChapter = currentIndex > 0 ? bookChapters[currentIndex - 1].path : null;
        const nextChapter = currentIndex < bookChapters.length - 1 ? bookChapters[currentIndex + 1].path : null;

        results.push({
            path: page.path,
            layout: 'story',
            data: {
                is_chapter: true,
                current_chapter: {
                    id: page.path,
                    title: page.title,
                    bookTitle: page.book,
                    publishDate: page.date.format('YYYY-MM-DD'),
                    wordCount: page.words,
                    content: page.content,
                    description: page.description,
                    prevChapter: prevChapter,
                    nextChapter: nextChapter,
                    isFirstChapter: currentIndex === 0,
                    isLastChapter: currentIndex === bookChapters.length - 1
                },
                stories: processStoryPages(storyPages, page.book)
            }
        });
    });

    return results;
});

// 处理故事页面，组织成书籍和章节的结构
function processStoryPages(pages, currentBook = null) {
    const books = new Map();

    pages.forEach(page => {
        if (!books.has(page.book)) {
            books.set(page.book, {
                id: page.book,
                title: page.book,
                isOpen: currentBook === page.book,
                chapters: []
            });
        }

        const book = books.get(page.book);
        book.chapters.push({
            id: page.path,
            title: page.title,
            publishDate: page.date.format('YYYY-MM-DD'),
            wordCount: page.words,
            description: page.description
        });
    });

    // 对每本书的章节进行排序
    books.forEach(book => {
        book.chapters.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
    });

    // 将Map转换为数组并按书籍标题排序
    return Array.from(books.values()).sort((a, b) => a.title.localeCompare(b.title));
} 